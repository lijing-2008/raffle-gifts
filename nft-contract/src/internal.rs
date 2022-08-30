use crate::Contract;
use crate::*;

// calculate hash
pub(crate) fn hash_account_id(account_id: &AccountId) -> CryptoHash {
    // get the default hash
    let mut hash = CryptoHash::default();
    // we hash the accountID and return it
    hash.copy_from_slice(&env::sha256(account_id.as_bytes()));
    hash
}
pub(crate) fn hash_level(level: &TokenLevel) -> CryptoHash {
    // get the default hash
    let mut hash = CryptoHash::default();
    // we hash the accountID and return it
    hash.copy_from_slice(&env::sha256(level.as_bytes()));
    hash
}

// refund the initial deposit based on the amount of storage that  was used up
pub(crate) fn refund_deposit(storage_used: u64) {
    // get how much it would cost to store the information
    let required_cost = env::storage_byte_cost() * Balance::from(storage_used);
    // get the attached deposit
    let attached_deposit = env::attached_deposit();
    // make sure that the attached deposit is greater than or equal to the required cost
    assert!(
        required_cost <= attached_deposit,
        "Must attach {} yoctoNEAR to cover storage",
        required_cost
    );
    // get the refund amount from the attached deposit - required cost
    let refund = attached_deposit - required_cost;
    // if the refund is greater than 1 yoctoNEAR, we refund the predecessor that amount
    if refund > 1 {
        Promise::new(env::predecessor_account_id()).transfer(refund);
    }
}
// used to make sure the user attached exactly 1 yoctoNEAR
// pub(crate) fn assert_one_near() {
//     assert_eq!(
//         env::attached_deposit(),
//         ONE_NEAR,
//         "Rqueries attached deposit of exactly 1 NEAR",
//     )
// }
// assert that the user has attached at least 1 yoctoNEAR(for security reasons and to pay for storage)
pub(crate) fn assert_at_least_more_than_one_near() {
    assert!(
        env::attached_deposit() >= ONE_NEAR,
        "Requires attached deposit of at least 1 yoctoNEAR.",
    )
}

impl Contract {
    // add a token to the set of tokens an owner has
    pub(crate) fn internal_add_token_to_owner(
        &mut self,
        account_id: &AccountId,
        token_id: &TokenId,
    ) {
        // get the set of tokens for the given account
        let mut tokens_set = self.tokens_per_owner.get(account_id).unwrap_or_else(|| {
            // if the account doesn't have any tokens,we create a new unordered set
            UnorderedSet::new(
                StorageKey::TokenPerOwnerInner {
                    account_id_hash: hash_account_id(&account_id),
                }
                .try_to_vec()
                .unwrap(),
            )
        });

        // insert the token ID into the set
        tokens_set.insert(token_id);

        // insert that set for the given account ID
        self.tokens_per_owner.insert(account_id, &tokens_set);
    }

    pub(crate) fn internal_add_token_to_raffle(
        &mut self,
        token_level: &TokenLevel,
        token_id: &TokenId,
    ) {
        let mut raffle_token_level_set = self
            .raffle_tokens_per_level
            .get(token_level)
            .unwrap_or_else(|| {
                // if the level doesn't have any tokens, we create a new vector
                Vector::new(
                    StorageKey::RaffleTokensPerLevelInner {
                        level_hash: hash_level(token_level),
                    }
                    .try_to_vec()
                    .unwrap(),
                )
            });
        raffle_token_level_set.push(&token_id);
        self.raffle_tokens_per_level
            .insert(token_level, &raffle_token_level_set);
    }

    // remove a token from owner
    pub(crate) fn internal_remove_token_from_owner(
        &mut self,
        account_id: &AccountId,
        token_id: &TokenId,
    ) {
        // we get the set of tokens that the owner has
        let mut tokens_set = self
            .tokens_per_owner
            .get(&account_id)
            .expect("token should be owned by the sender.");
        //remove the token_id from the set of tokens
        tokens_set.remove(token_id);
        // if token set is now empty, we remove the owner from the tokens_per_owner collection
        if tokens_set.is_empty() {
            self.tokens_per_owner.remove(account_id);
        } else {
            self.tokens_per_owner.insert(account_id, &tokens_set);
        }
    }

    // remove a token from raffle
    pub(crate) fn internal_remove_token_from_raffle(
        &mut self,
        token_id: &TokenId,
        token_index: u64,
    ) {
        // get the token object by the passing token_id
        let token = self.tokens_by_id.get(&token_id).expect("No token");
        let token_level = token.level;
        let mut raffle_token_vector = self
            .raffle_tokens_per_level
            .get(&token_level)
            .expect("token should in the given level");
        assert_eq!(
            *token_id,
            raffle_token_vector.get(token_index).unwrap(),
            "token id to be removed is not equal to the given index value"
        );
        raffle_token_vector.swap_remove(token_index);
        self.raffle_tokens_per_level
            .insert(&token_level, &raffle_token_vector);
    }

    pub(crate) fn internal_transfer(
        &mut self,
        receiver_id: &AccountId,
        token_id: &TokenId,
        token_index: u64,
    ) -> Token {
        // get the token object by the passing token_id
        let token = self.tokens_by_id.get(&token_id).expect("No token");

        // make sure that the sender isn't sending the token to themselves
        assert_ne!(
            &(token.owner_id),
            receiver_id,
            "the token sender and the receiver should be different."
        );

        // remove the token from it's current owner's set
        self.internal_remove_token_from_owner(&token.owner_id, token_id);
        // add the token to the receiver
        self.internal_add_token_to_owner(receiver_id, token_id);
        // remove the token from raffle
        self.internal_remove_token_from_raffle(token_id, token_index);

        let new_token = Token {
            owner_id: receiver_id.clone(),
            level: token.clone().level,
        };
        self.tokens_by_id.insert(token_id, &new_token);
        // send near to the old ownder
        Promise::new(token.clone().owner_id).transfer(env::attached_deposit());

        // Construct the transfer log as per the events standard.
        let nft_transfer_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftTransfer(vec![NftTransferLog {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id: Some(token.owner_id.to_string()),
                // The old owner's account ID.
                old_owner_id: token.owner_id.to_string(),
                // The account ID of the new owner of the token.
                new_owner_id: receiver_id.to_string(),
                // A vector containing the token IDs as strings.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_transfer_log.to_string());

        token
    }
}
