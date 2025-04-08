import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { getAllCollections } from "@/lib/actions/collection.actions";
import { getNFTsByCollection } from "@/lib/actions/nft.actions";
import {
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  nft7,
  nft8,
  stake,
} from "../../../assets/landingPage/discover_nft";
import { sign } from "../../../assets/landingPage/nft";
import Link from "next/link";

const DiscoverNFTs = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
  const [collectionNFTs, setCollectionNFTs] = useState<any[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [loadingNFTs, setLoadingNFTs] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const result = await getAllCollections();
        if (result.success) {
          setCollections(result.data || []);
          if (result.data && result.data.length > 0) {
            setSelectedCollectionId(result.data[0]._id as string);
          }
        } else {
          setError(result.error || "An error occurred");
          toast.error(result.error || "Error fetching collections");
        }
      } catch (err) {
        setError("Failed to fetch collections");
        toast.error("Failed to fetch collections");
      } finally {
        setLoadingCollections(false);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    if (!selectedCollectionId) return;
    const fetchCollectionNFTs = async () => {
      setLoadingNFTs(true);
      try {
        const result = await getNFTsByCollection(selectedCollectionId);
        if (result.success) {
          setCollectionNFTs(result.data || []);
        } else {
          setError(result.error || "Error fetching NFTs");
          toast.error(result.error || "Error fetching NFTs");
        }
      } catch (err) {
        setError("Failed to fetch NFTs for the collection");
        toast.error("Failed to fetch NFTs for the collection");
      } finally {
        setLoadingNFTs(false);
      }
    };
    fetchCollectionNFTs();
  }, [selectedCollectionId]);

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 sm:gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold">DISCOVER MORE NFTS</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {loadingCollections ? (
            <Loader text="Loading collections..." />
          ) : (
            collections.map((col) => (
              <button
                key={col._id}
                onClick={() => handleCollectionSelect(col._id)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm ${
                  selectedCollectionId === col._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black"
                } hover:bg-gray-200 transition-all`}
              >
                {col.name}
              </button>
            ))
          )}
          <button className="px-3 text-black sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 transition-all">
            All Filters
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="relative overflow-hidden">
        {loadingNFTs ? (
          <Loader text="Loading NFTs..." />
        ) : collectionNFTs.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCollectionId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {collectionNFTs.map((nft) => (
                <motion.div
                  key={nft._id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {nft.owner && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      SOLD
                    </span>
                  )}
                  <div className="relative aspect-square mb-2 sm:mb-4">
                    <Image
                      width={100}
                      height={100}
                      src={nft.image.url}
                      alt={`NFT ${nft.name}`}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                    />
                  </div>
                  <div className="px-1 sm:px-2">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                      {nft.name}
                    </h3>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Image
                        width={100}
                        height={100}
                        src={nft.image.url}
                        alt="Token"
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                      <span className="text-sm sm:text-base text-gray-600">
                        {nft.price} ETH
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-gray-600 text-center">
            No NFTs available for this collection.
          </p>
        )}
      </div>

      <div className="w-full mt-6 sm:mt-8 flex justify-center">
        <Link
          href="/explore"
          className="p-2 sm:p-3 px-4 sm:px-6 rounded-full bg-white text-xs sm:text-sm md:text-base font-semibold text-black hover:opacity-90 transition-opacity"
        >
          Discover More
        </Link>
      </div>
    </div>
  );
};

export default DiscoverNFTs;
