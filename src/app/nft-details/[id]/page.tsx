// src/app/nft-details/[id]/page.tsx

import React from "react";
import { getNFTById } from "@/lib/actions/nft.actions";
import { getCollectionById } from "@/lib/actions/collection.actions";
import NftDetailsComponent from "@/components/NftDetailsComponent";
import { ToastContainer } from "react-toastify";

export default async function NFTDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const nftResult = await getNFTById(id);
  if (!nftResult.success || !nftResult.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load NFT details: {nftResult.error || "NFT not found."}
        </p>
      </div>
    );
  }

  const nft = nftResult.data;

  const collectionResult = await getCollectionById(nft.collectionName);
  const collection = collectionResult.success ? collectionResult.data : null;

  return (
    <div className="w-full h-fit">
      <ToastContainer />{" "}
      <NftDetailsComponent nft={nft} collection={collection} />
    </div>
  );
}
