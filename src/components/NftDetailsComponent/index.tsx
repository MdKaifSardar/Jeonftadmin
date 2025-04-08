"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { buyNFT } from "@/lib/actions/nft.actions";
import { useRouter } from "next/navigation";

interface NftDetailsProps {
  nft?: any;
  collection?: any;
}

const NftDetailsComponent: React.FC<NftDetailsProps> = ({
  nft,
  collection,
}) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!nft) {
      toast.error("Failed to fetch NFT details");
    }
  }, [nft]);

  if (!nft) {
    return <Loader text="Loading NFT details..." />;
  }

  // New function to handle confirmed purchase using buyNFT from nft actions
  const handleConfirmBuy = async () => {
    setIsBuying(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not logged in.");
        return;
      }
      // Directly call the buyNFT function from nft actions
      const result = await buyNFT(nft._id, userId);
      if (result.success) {
        toast.success("NFT purchased successfully!");
        // Redirect to owned-nfts page on success
        router.push("/user-dashboard/owned-nfts");
      } else {
        toast.error(result.error || "Failed to purchase NFT.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to purchase NFT.");
    } finally {
      setIsBuying(false);
      setShowPurchaseModal(false);
    }
  };

  // Updated "Buy NFT" button to open modal
  const openPurchaseModal = () => {
    setShowPurchaseModal(true);
  };

  return (
    <div className="w-[70%] mt-[6rem] mx-auto p-4">
      {/* NFT Details */}
      <h1 className="text-3xl font-bold mb-6">{nft.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* NFT Image takes half the width */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-0 pb-[100%]">
            <Image
              src={nft.image.url}
              alt={nft.name}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        {/* NFT Details take the other half */}
        <div className="w-full md:w-1/2 h-full">
          <div className="w-full flex flex-col justify-between items-start">
            <p className="text-lg font-semibold">
              Description:{" "}
              <span className="text-blue-600">{nft.description}</span>
            </p>
            <p className="text-lg font-semibold">
              Price: <span className="text-blue-600">{nft.price} ETH</span>
            </p>
            <p className="text-lg font-semibold">
              Royalty: <span className="text-blue-600">{nft.royalty}%</span>
            </p>
          </div>
          {/* Collection Details Box */}
          <div>
            <h2 className="text-2xl font-bold">Collection Details</h2>
            {collection ? (
              <div className="w-full flex flex-col justify-center items-start">
                <p className="text-lg">
                  Name: <span className="text-blue-600">{collection.name}</span>
                </p>
                <p className="text-lg">
                  Collection Image:
                </p>
                {collection.image && (
                  <div className="w-[40%]">
                    <Image
                      src={collection.image.url}
                      alt={collection.name}
                      layout="responsive"
                      width={300}
                      height={200}
                      className="rounded-md w-full"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-500">Collection details not found.</p>
              </div>
            )}
          </div>
          {/* Conditionally render the Buy NFT button */}
          {!nft.owner && (
            <button
              onClick={openPurchaseModal}
              className="mt-[1rem] w-full py-3 px-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              Buy NFT
            </button>
          )}
          {nft.owner && (
            <p className="mt-[1rem] text-red-500 font-medium">
              This NFT is already owned.
            </p>
          )}
        </div>
      </div>


      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
            <p className="mb-4">
              Are you sure you want to buy this NFT for {nft.price} ETH?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPurchaseModal(false)}
                disabled={isBuying}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBuy}
                disabled={isBuying}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {isBuying ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NftDetailsComponent;
