use near_sdk::__private::Metadata;
use near_sdk::json_types::Base64VecU8;
use near_units::parse_near;
use nft_contract::TokenMetadata;
use serde_json::json;
use workspaces::prelude::*;
use workspaces::{network::Sandbox, Account, Contract, Worker};
const WASM_FILEPATH: &str = "../res/main.wasm";
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(WASM_FILEPATH)?;
    let contract = worker.dev_deploy(&wasm).await?;

    // create accounts
    let owner = worker.root_account()?;

    let jack = owner
        .create_subaccount(&worker, "jack")
        .initial_balance(parse_near!("30N"))
        .transact()
        .await?
        .into_result()?;

    let lucy = owner
        .create_subaccount(&worker, "lucy")
        .initial_balance(parse_near!("30N"))
        .transact()
        .await?
        .into_result()?;

    // Initialize contract
    contract
        .call(&worker, "new_default_meta")
        .args_json(json!({"owner_id": owner.id()}))?
        .transact()
        .await?;

    // begin tests
    // mint_nft
    test_mint_nft(&owner, &contract, &worker).await?;

    Ok(())
}

async fn test_mint_nft(
    owner: &Account,
    contract: &Contract,
    worker: &Worker<Sandbox>,
) -> anyhow::Result<()> {
    owner
        .call(&worker, contract.id(), "nft_mint")
        .args_json(json!({
            "metadata":TokenMetadata{
                title: Some("default title1".to_string()),
                description: Some("an special NFT".to_string()),
                media: Some("".to_string()),
                media_hash: Some(Base64VecU8::from(vec![])),
                copies: Some(1),
                issued_at: Some(1),
                expires_at: Some(1),
                starts_at: Some(1),
                updated_at: Some(1),
                extra: Some("".to_string()),
                reference: Some("".to_string()),
                reference_hash: Some(Base64VecU8::from(vec![])),
            },
            "level": "SSR".to_string()
        }))?
        .transact()
        .await?;

    let balance = owner.view_account(&worker).await?.balance;
    println!("owner balance:{}", balance);

    Ok(())
}
