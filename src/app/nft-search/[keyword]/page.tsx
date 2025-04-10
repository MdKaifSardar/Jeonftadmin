"use client";

import React, { useEffect, useState } from "react";
import { searchNFTs } from "@/lib/actions/nft.actions";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "next/navigation";

const NFTSearchPage = () => {
  const params = useParams() as { keyword: string }; // Cast params to include keyword
  const rawKeyword = params.keyword;
  const keyword = rawKeyword.replace(/%20/g, " "); // Replace '%20' with spaces
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const result = await searchNFTs(keyword);
        if (result.success) {
          setNfts(result.data || []);
        } else {
          setError(result.error || "Failed to fetch NFTs.");
          toast.error(result.error || "Failed to fetch NFTs.");
        }
      } catch (err) {
        console.error("Error fetching NFTs:", err);
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchNFTs();
    }
  }, [keyword]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-black">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Search Results for: {keyword}</h1>
      {loading && <Loader text="Loading NFTs..." />}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!loading && nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative"
            >
              {nft.owner && (
                <span className="z-[100] absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  SOLD
                </span>
              )}
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
      ) : (
        !loading && (
          <p className="text-gray-600 text-center">
            No NFTs found. Try searching with a different keyword.
          </p>
        )
      )}
    </div>
  );
};

export default NFTSearchPage;
