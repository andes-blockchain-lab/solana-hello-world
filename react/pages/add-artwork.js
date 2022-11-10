import React, { useState } from "react";
import { IDL } from "../public/solana_artworks";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function AddArtwork() {
  const router = useRouter();
  const [inputArtworkTitle, setInputArtworkTitle] = useState("");
  const [inputArtworkValue, setInputArtworkValue] = useState("");
  const programID = new PublicKey(IDL.metadata.address);

  const { SystemProgram, Keypair } = web3;

  const opts = {
    preflightCommitment: "processed",
  };

  const getProvider = () => {
    const connection = new Connection("http://localhost:8899", opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const stringToBytes = (input) => {
    return new TextEncoder().encode(input);
  };

  const addArtwork = async () => {
    if (inputArtworkValue.length > 0 && inputArtworkTitle.length > 0) {
      var provider = getProvider();
      var program = new Program(IDL, programID, provider);
      const [pda] = await PublicKey.findProgramAddress(
        [
          stringToBytes("img_account"),
          provider.wallet.publicKey.toBytes(),
          stringToBytes(inputArtworkValue),
          stringToBytes(inputArtworkTitle),
        ],
        program.programId
      );

      await program.rpc.initialize(inputArtworkValue, inputArtworkTitle, {
        accounts: {
          artworkImg: pda,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      });

      setInputArtworkValue("");
      setInputArtworkTitle("");
      router.push("/");
    } else {
      alert("Empty input. Try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
      <input
          placeholder="Titulo"
          className="mt-8 border rounded p-4"
          onChange={(e) => setInputArtworkTitle(e.target.value)}
        />
        <input
          placeholder="URL Imagen"
          className="mt-8 border rounded p-4"
          onChange={(e) => setInputArtworkValue(e.target.value)}
        />
        <button
          onClick={addArtwork}
          className={styles.sol_button + " mt-4"}
        >
          Agregar obra
        </button>
      </div>
    </div>
  );
}
