import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { getAllCollections } from "@/lib/actions/collection.actions";
import { getNFTsByCollection } from "@/lib/actions/nft.actions";

const ExploreComponent = () => {
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
            setSelectedCollectionId(result.data[0]._id);
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Explore NFTs</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        {loadingCollections ? (
          <Loader text="Loading collections..." />
        ) : (
          collections.map((col) => (
            <button
              key={col._id}
              onClick={() => handleCollectionSelect(col._id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCollectionId === col._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {col.name}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="relative">
        {loadingNFTs ? (
          <Loader text="Loading NFTs..." />
        ) : collectionNFTs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collectionNFTs.map((nft) => (
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
          <p className="text-gray-600 text-center">
            No NFTs available for this collection.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreComponent;
