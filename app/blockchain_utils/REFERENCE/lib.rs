// THIS IS THE ANCHOR PROGRAM DEPLOYED TO STORE WALLET -> CANDY MACHINE ADDRESS MAPPINGS

use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("A8bZXDMH2YeCeFeedyiiV7SEScZtzaZXPf2LEBMnKra5");

#[program]
pub mod my_kv_store {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let kv_store = &mut ctx.accounts.kv_store;
        kv_store.keys = Vec::new();
        kv_store.values = Vec::new();
        Ok(())
    }

    pub fn insert_entry(ctx: Context<InsertEntry>, key: Pubkey, value: Pubkey) -> Result<()> {
        let kv_store = &mut ctx.accounts.kv_store;
        kv_store.keys.push(key);
        kv_store.values.push(value);
        Ok(())
    }

    pub fn get_entry(ctx: Context<GetEntry>, key: Pubkey) -> Result<Pubkey> {
        let kv_store = &ctx.accounts.kv_store;
        if let Some(index) = kv_store.keys.iter().position(|&k| k == key) {
            return Ok(kv_store.values[index]);
        }
        Err(ErrorCode::EntryNotFound.into())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub kv_store: Account<'info, KvStore>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InsertEntry<'info> {
    #[account(mut)]
    pub kv_store: Account<'info, KvStore>,
}

#[derive(Accounts)]
pub struct GetEntry<'info> {
    #[account(mut)]
    pub kv_store: Account<'info, KvStore>,
}

#[account]
pub struct KvStore {
    pub keys: Vec<Pubkey>,
    pub values: Vec<Pubkey>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The requested entry does not exist.")]
    EntryNotFound,
}
