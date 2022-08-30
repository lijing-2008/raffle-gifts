use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet, Vector};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise};

pub use enumeration::*;
pub use events::*;
pub use internal::*;
pub use metadata::*;
pub use mint::*;
pub use nft_core::*;
pub use util::*;

mod enumeration;
mod events;
mod internal;
mod metadata;
mod mint;
mod nft_core;
mod util;

/// This spec can be treated like a version of the standard
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    // contract owner
    pub owner_id: AccountId,

    // keeps track of all the raffle token ID for given token level
    pub raffle_tokens_per_level: LookupMap<TokenLevel, Vector<TokenId>>,

    // admins, who have the ablity to mint nfts
    pub admins: UnorderedSet<AccountId>,

    // keeps track of all the token IDs for a given account
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

    //keeps track of the token struct for a given token ID
    pub tokens_by_id: LookupMap<TokenId, Token>,

    //keeps track of the token metadata for a given token ID
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,

    // keeps track of the metadata for the contract
    pub metadata: LazyOption<NFTContractMetadata>,
}
#[derive(BorshSerialize)]
pub enum StorageKey {
    Admins,
    RaffleTokensPerLevel,
    RaffleTokensPerLevelInner { level_hash: CryptoHash },
    TokensPerOwner,
    TokenPerOwnerInner { account_id_hash: CryptoHash },
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,

    TokensPerType,
    TokensPerTypeInner { token_type_hash: CryptoHash },
    TokenTypesLocked,
}

#[near_bindgen]
impl Contract {
    /*
        initialization function (can only be called once).
        this initializes the contract with default metadata so the
        user doesn't have to manually type metadata.
    */
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: "nft-1.0.0".to_string(),
                name: "Raffle gifts Contract".to_string(),
                symbol: "RaffleGifts".to_string(),
                icon: None,
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id.
    */
    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        let mut admins = UnorderedSet::new(StorageKey::Admins.try_to_vec().unwrap());
        // insert owner_id as an administrator
        admins.insert(&owner_id);
        Self {
            raffle_tokens_per_level: LookupMap::new(
                StorageKey::RaffleTokensPerLevel.try_to_vec().unwrap(),
            ),
            admins,
            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
            tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
            token_metadata_by_id: UnorderedMap::new(
                StorageKey::TokenMetadataById.try_to_vec().unwrap(),
            ),
            owner_id,
            metadata: LazyOption::new(
                StorageKey::NFTContractMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
        }
    }
}
