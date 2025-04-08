"use client";
import React from "react";
import useSearchNFTs from "@/hooks/useSearchNFTs";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";

const NFTSearchPage = () => {
  const { fetchedNfts, loading, error } = useSearchNFTs();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {loading && <Loader text="Loading NFTs..." />}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!loading && fetchedNfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fetchedNfts.map((nft) => (
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
