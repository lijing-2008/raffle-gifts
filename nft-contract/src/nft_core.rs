use crate::*;

pub trait NonFungibleTokenCore {
    //transfers an NFT to a receiver ID
    fn nft_transfer(&mut self);
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken>;
}

#[near_bindgen]
impl NonFungibleTokenCore for Contract {
    //implementation of the nft_transfer method. This transfers the NFT from the current owner to the receiver.
    #[payable]
    fn nft_transfer(&mut self) {
        assert_at_least_more_than_one_near();
        let raffle_id = env::predecessor_account_id();
        let attached_deposit = env::attached_deposit();
        let raffle_token_level = get_random_token_level_by_deposit(attached_deposit);
        let raffle_token_level_vector = self.raffle_tokens_per_level.get(&raffle_token_level);
        if let Some(raffle_token_level_vector) = raffle_token_level_vector {
            let raffle_token = get_random_token_id(&raffle_token_level_vector);
            if let Some(raffle_token) = raffle_token {
                // transfer
                self.internal_transfer(&raffle_id, &raffle_token.1, raffle_token.0);
            } else {
                Promise::new(raffle_id).transfer(attached_deposit);
            }
        } else {
            Promise::new(raffle_id).transfer(attached_deposit);
        }
    }

    //get the information for a specific token ID
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken> {
        if let Some(token) = self.tokens_by_id.get(&token_id) {
            let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
            Some(JsonToken {
                token_id,
                owner_id: token.owner_id,
                metadata,
                level: token.level,
            })
        } else {
            None
        }
    }
}
