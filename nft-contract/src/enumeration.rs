use crate::*;

#[near_bindgen]
impl Contract {
    // check if the caller is admin or not
    pub fn is_admin(&self, account_id: &AccountId) -> bool {
        self.admins.contains(&account_id)
    }

    //Query for the total supply of NFTs on the contract
    pub fn nft_total_supply(&self) -> U128 {
        U128(self.token_metadata_by_id.len() as u128)
    }

    //Query for nft tokens on the contract regardless of the owner using pagination
    pub fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<JsonToken> {
        let start = u128::from(from_index.unwrap_or(U128(0)));
        self.token_metadata_by_id
            .keys()
            .skip(start as usize)
            .take(limit.unwrap_or(50) as usize)
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            .collect()
    }

    //get the total supply of NFTs for a given owner
    pub fn nft_supply_for_owner(&self, account_id: AccountId) -> U128 {
        let tokens_set_owner_id = self.tokens_per_owner.get(&account_id);
        if let Some(tokens_set) = tokens_set_owner_id {
            U128(tokens_set.len() as u128)
        } else {
            U128(0)
        }
    }

    //Query for all the tokens for an owner
    pub fn nft_tokens_for_owner(
        &self,
        account_id: AccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<JsonToken> {
        // get the set of tokens for the passed in owner
        let tokens_for_owner_set = self.tokens_per_owner.get(&account_id);
        // if there is some set of tokens,set the tokens variable equal to that set
        let tokens = if let Some(tokens_set) = tokens_for_owner_set {
            tokens_set
        } else {
            // if there is no set of tokens,simply return an empty vector
            return vec![];
        };

        // where to start pagination - if we have a from_index,we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));
        // iterate through the keys vector
        tokens
            .iter()
            .skip(start as usize)
            .take(limit.unwrap_or(50) as usize)
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            .collect()
    }

    // Query for all the raffle tokens for a given token leve
    pub fn nft_raffle_tokens_by_level(
        &self,
        from_index: Option<U128>,
        limit: Option<u64>,
        level: TokenLevel,
    ) -> Vec<JsonToken> {
        let tokens_for_raffle_vector =
            self.raffle_tokens_per_level.get(&level).unwrap_or_else(|| {
                // if the level doesn't have any tokens, we create a new vector
                Vector::new(
                    StorageKey::RaffleTokensPerLevelInner {
                        level_hash: hash_level(&level),
                    }
                    .try_to_vec()
                    .unwrap(),
                )
            });
        let start = u128::from(from_index.unwrap_or(U128(0)));
        if tokens_for_raffle_vector.is_empty() {
            vec![]
        } else {
            tokens_for_raffle_vector
                .iter()
                .skip(start as usize)
                .take(limit.unwrap_or(50) as usize)
                .map(|token_id| self.nft_token(token_id).unwrap())
                .collect()
        }
    }

    pub fn nft_raffle_total_by_level(&self, level: TokenLevel) -> u64 {
        let tokens_for_raffle_vector =
            self.raffle_tokens_per_level.get(&level).unwrap_or_else(|| {
                // if the level doesn't have any tokens, we create a new vector
                Vector::new(
                    StorageKey::RaffleTokensPerLevelInner {
                        level_hash: hash_level(&level),
                    }
                    .try_to_vec()
                    .unwrap(),
                )
            });
        tokens_for_raffle_vector.len()
    }
}
