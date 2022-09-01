use crate::*;

pub trait AdminCore {
    // add admin
    fn admin_add(&mut self, account_id: AccountId);
    // remove admin
    fn admin_remove(&mut self, account_id: AccountId);
}

#[near_bindgen]
impl AdminCore for Contract {
    // add admin
    #[payable]
    fn admin_add(&mut self, account_id: AccountId) {
        assert_at_least_one_yocto();
        let caller_id = env::predecessor_account_id();
        assert_eq!(
            caller_id, self.owner_id,
            "Only the contract owner can add admin user."
        );
        // measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();
        // insert admin account.
        self.admins.insert(&account_id);
        // calculate required_storage
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;
        refund_deposit(required_storage_in_bytes);
    }
    // remove admin
    #[payable]
    fn admin_remove(&mut self, account_id: AccountId) {
        assert_at_least_one_yocto();
        let caller_id = env::predecessor_account_id();
        // make sure only contract owner can remove admin
        assert_eq!(
            caller_id, self.owner_id,
            "Only the contract owner can add admin user."
        );
        // make sure account to be removed is not the contract owner
        assert_ne!(caller_id, account_id, "Can not remove conatract owner");
        self.admins.remove(&account_id);
        // refund removed account storage and send near to the contract owner
        refund_account_id(caller_id, account_id);
    }
}
