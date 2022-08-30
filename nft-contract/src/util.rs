use near_sdk::{collections::Vector, env, Balance};

use crate::{TokenId, TokenLevel};
pub const ONE_NEAR: Balance = 100_000_000_000_000_000_000_000u128;
pub const TWO_NEAR: Balance = 200_000_000_000_000_000_000_000u128;
pub const FIVE_NEAR: Balance = 500_000_000_000_000_000_000_000u128;
/// get a random number (u64)
pub fn get_random_number() -> u64 {
    let seed = env::random_seed();
    let mut arr: [u8; 8] = Default::default();
    arr.copy_from_slice(&seed[..8]);
    let seed_num = u64::from_le_bytes(arr);
    seed_num
}

pub fn get_random_token_id(raffle_vector: &Vector<u64>) -> Option<(u64, TokenId)> {
    let seed_num = get_random_number();
    let vec_len = raffle_vector.len();
    if vec_len > 0 {
        let index = seed_num % vec_len;
        let raffle_id = raffle_vector.get(index).unwrap();
        Some((index, raffle_id))
    } else {
        None
    }
}
// get the probabitlity for given attached deposit
pub fn get_probability_by_deposit(attached_deposit: Balance) -> (u64, u64, u64, u64) {
    if attached_deposit < ONE_NEAR {
        (0, 0, 0, 0)
    } else if attached_deposit >= ONE_NEAR && attached_deposit < TWO_NEAR {
        (40, 70, 95, 100)
    } else if attached_deposit >= TWO_NEAR && attached_deposit < FIVE_NEAR {
        (25, 60, 90, 100)
    } else {
        (10, 50, 85, 100)
    }
}
// get the probable token level according to the attached deposit
pub fn get_random_token_level_by_deposit(attached_deposit: Balance) -> TokenLevel {
    let probability = get_probability_by_deposit(attached_deposit);
    if probability.0 == 0 {
        panic!("attached deposit is to low.")
    }
    let seed_num = get_random_number();
    // let mut rng = rand::thread_rng();
    // let seed_num = rng.gen_range(0..128);

    // 0-99
    let raffle_num = seed_num % 100;
    if raffle_num < probability.0 {
        "N".to_string()
    } else if raffle_num >= probability.0 && raffle_num < probability.1 {
        "R".to_string()
    } else if raffle_num >= probability.1 && raffle_num < probability.2 {
        "SR".to_string()
    } else {
        "SSR".to_string()
    }
}

#[cfg(test)]
mod tests {
    use near_sdk::{
        collections::{LookupMap, Vector},
        env::log,
        Balance,
    };
    const ONE_NEAR: Balance = 100_000_000_000_000_000_000_000u128;
    const TWO_NEAR: Balance = 200_000_000_000_000_000_000_000u128;
    const FIVE_NEAR: Balance = 500_000_000_000_000_000_000_000u128;
    use crate::{get_random_number, get_random_token_id, get_random_token_level_by_deposit};

    #[test]
    pub fn test_get_random_number() {
        println!("{}", get_random_number())
    }

    #[test]
    pub fn test_vector() {
        let mut set: Vector<u64> = Vector::new(b"m");
        set.push(&10);
        set.push(&20);
        set.push(&33);
        set.push(&40);
        set.push(&50);
        // println!("init set: {:?}", set);
        // let len = set.len();
        // println!("len: {}", len);

        // let op = set.get(3);
        // println!("index 3 :{:?}", op);

        // let res = set.swap_remove(2);
        // println!("remove element: {}", res);
        // println!("after remove , set is: {:?}", set);
        // println!("index 2: {:?}", set.get(2));

        // let res = set.pop();
        // println!("pop element: {:?}", res);
        // println!("after pop , set is: {:?}", set);

        let id = get_random_token_id(&mut set);
        println!("random token: {:?}", id);
        println!("last element: ");
        for i in 0..5 {
            println!("index {}: {:?}", i, set.get(i))
        }
    }

    #[test]
    pub fn test_get_token_level_by_deposit() {
        let level1 = get_random_token_level_by_deposit(ONE_NEAR + 10);
        println!("{}", level1);
        let level2 = get_random_token_level_by_deposit(TWO_NEAR + 10);
        println!("{}", level2);
        let level5 = get_random_token_level_by_deposit(FIVE_NEAR + 10);
        println!("{}", level5);
    }

    #[test]
    pub fn test_swap_and_remove() {
        let mut raffle_collection: LookupMap<String, Vector<u32>> = LookupMap::new(b"r");

        let mut v = Vector::new(b"m");
        v.push(&32);
        raffle_collection.insert(&"SSR".into(), &v);
        let mut ele = raffle_collection.get(&"SSR".into()).unwrap();
        ele.swap_remove(0);

        raffle_collection.insert(&"SSR".into(), &ele);

        println!("{:?}", raffle_collection.get(&"SSR".into()).unwrap());
    }
}
