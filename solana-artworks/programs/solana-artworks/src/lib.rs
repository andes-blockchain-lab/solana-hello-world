use anchor_lang::prelude::*;

declare_id!("63uptqg9z6XpNXxHdesENUZXzvR4G42pHFetqn7jENR7");

#[program]
pub mod solana_artworks {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, img_url: String, title: String) -> Result<()> {
        let artwork_img = &mut ctx.accounts.artwork_img;
        artwork_img.owner = ctx.accounts.user.key();
        artwork_img.img_url = img_url;
        artwork_img.title = title;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(img_url: String, title: String)]
pub struct Initialize<'info> {
    #[account(
    init, 
    seeds = [b"img_account", user.key().as_ref(), img_url.as_bytes(), title.as_bytes()], 
    bump, 
    payer = user, 
    space = 8 + 32 + img_url.as_bytes().len() + 4 + title.as_bytes().len() + 4)]
    pub artwork_img: Account<'info, ArtworkImg>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct ArtworkImg {
    pub owner: Pubkey,
    pub img_url: String,
    pub title: String,
}
