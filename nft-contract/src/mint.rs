use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(&mut self, metadata: TokenMetadata, token_level: String) {
        // make sure only administrator can mint nft
        let account_id = env::predecessor_account_id();
        assert!(
            self.admins.contains(&account_id),
            "Only administrator can mint NFT."
        );

        // measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        let token = Token {
            owner_id: account_id.clone(),
            level: token_level.clone(),
        };

        // insert the token ID and token struct and make sure that the token doesn't exist
        let token_id = env::block_height();
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists."
        );

        // insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &metadata);

        // call the internal method for adding the token to the level
        self.internal_add_token_to_raffle(&token_level, &token_id);

        // call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&account_id, &token_id);

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());

        // calculate required_storage
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        // refund any excess storage if the user attached too much.
        // Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes)
    }
}
