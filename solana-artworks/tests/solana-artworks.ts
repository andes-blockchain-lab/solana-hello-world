import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaArtworks } from "../target/types/solana_artworks";
import { TextEncoder } from "util";
const { PublicKey, SystemProgram } = anchor.web3;

var assert = require("assert");

const stringToBytes = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};

describe("solana-artworks", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaArtworks as Program<SolanaArtworks>;

  function assertNotNull<T>(v: T | null): T {
    if (!v) throw new Error();

    return v;
  }

  it("Is initialized!", async () => {

    const imgUrl = "https://test.com";

    const [pda] = await PublicKey.findProgramAddress(
      [
        stringToBytes("img_account"),
        anchor.getProvider().wallet.publicKey.toBytes(),
        stringToBytes(imgUrl),
      ],
      program.programId
    );

    let tx = await program.methods
      .initialize(imgUrl)
      .accounts({
        artworkImg: pda,
        user: anchor.getProvider().wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    assertNotNull(tx);
  });

  it("Get all artworks", async () => {
    const imgsByOwner = await program.account.artworkImg.all();

    assert.equal(1, imgsByOwner.length);
  });

  it("Finds artworks by pubkey!", async () => {
    const imgsByOwner = await program.account.artworkImg.all([
      {
        memcmp: {
          bytes: anchor.getProvider().wallet.publicKey.toBase58(),
          offset: 8,
        },
      },
    ]);

    assert.equal(1, imgsByOwner.length);
  });
});
