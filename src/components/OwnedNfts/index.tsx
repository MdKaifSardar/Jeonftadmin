"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { getOwnedNFTs } from "@/lib/actions/nft.actions";

const OwnedNfts = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (!userId) {
      toast.error("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    async function fetchOwnedNFTs() {
      try {
        const result = await getOwnedNFTs(userId as string);
        if (!result.success || !result.data) {
          toast.error(`Error: ${result.error || "Failed to fetch NFTs"}`);
          setNfts([]);
        } else {
          setNfts(result.data);
        }
      } catch (error: any) {
        toast.error(`Error fetching NFTs: ${error.message || "Unknown error"}`);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOwnedNFTs();
  }, []);

  if (loading) {
    return <Loader text="Loading your NFTs..." />;
  }

  if (nfts.length === 0) {
    return <div className="mt-[6rem] p-4 text-center">No NFTs owned.</div>;
  }

  return (
    <div className="mt-[6rem] p-4">
      <h1 className="text-2xl font-bold mb-4">My Owned NFTs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft: any) => (
          <div
            key={nft._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={nft.image.url}
                alt={nft.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
            <p className="text-gray-600 mb-4">{nft.price} ETH</p>
            <Link
              href={`/nft-details/${nft._id}`}
              className="mx-auto flex flex-col justify-center items-center w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Visit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnedNfts;
