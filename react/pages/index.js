import React, { useEffect, useState } from "react";
import { IDL } from "../public/solana_artworks";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider } from "@project-serum/anchor";

export default function Home() {
  const [artworks, setArtworks] = useState([]);

  const programID = new PublicKey(IDL.metadata.address);

  const network = "http://localhost:8899";
  const opts = {
    preflightCommitment: "processed",
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const getArtworkList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(IDL, programID, provider);
      const getAllArtworks = await program.account.artworkImg.all();
      setArtworks(getAllArtworks);
    } catch (error) {
      console.log("Error in getImgList: ", error);
      setArtworks(null);
    }
  };

  useEffect(() => {
    getArtworkList();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {artworks.map((artwork, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={artwork.account.imgUrl} />
              <div className="p-4">
                <p className="font-bold text-xl mb-2 text-white">{artwork.account.title}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
