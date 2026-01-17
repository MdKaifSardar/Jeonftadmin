import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllNFTs } from "@/lib/actions/nft.actions";
import { getAllCollections } from "@/lib/actions/collection.actions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const NFTMarketplace = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const result = await getAllNFTs();
        if (result.success) {
          setNfts(result.data || []);
        } else {
          setError(result.error || 'An error occurred');
          toast.error(result.error || 'An error occurred while fetching NFTs');
        }
      } catch (err) {
        setError("Failed to fetch NFTs");
        toast.error("Failed to fetch NFTs");
      } finally {
        setLoadingNFTs(false);
      }
    };
    fetchNFTs();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const result = await getAllCollections();
        if (result.success) {
          setCollections(result.data || []);
        } else {
          setError(result.error || 'An error occurred');
          toast.error(result.error || 'An error occurred while fetching collections');
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

  // Use first NFT as main display and next few as related NFTs
  const mainNFT = nfts.length > 0 ? nfts[0] : null;
  const relatedNFTs = nfts.length > 1 ? nfts.slice(1, 4) : [];

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-10 text-black">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
        {/* Main NFT Display */}
        <div className="sm:col-span-12 md:col-span-5">
          {loadingNFTs ? (
            <Loader text="Loading NFTs..." />
          ) : mainNFT ? (
            <div className="flex flex-col gap-4 rounded-3xl p-4 bg-white shadow-lg">
              <Image
                width={100}
                height={100}
                src={mainNFT.image.url}
                alt={mainNFT.name}
                className="w-full rounded-3xl"
              />
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    src={mainNFT.image.url}
                    alt={mainNFT.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-lg font-bold">{mainNFT.name}</span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {/* <div className="text-xs font-light">Highest bid</div> */}
                  <div className="text-sm flex items-center gap-1">
                    <Image
                      width={100}
                      height={100}
                      src={mainNFT.image.url}
                      alt="Token"
                      className="w-4 h-4"
                    />
                    <div className="text-sm text-gray-500">
                      {mainNFT.price} ETH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-4 bg-white shadow-lg text-center">
              <p>No NFT available.</p>
            </div>
          )}
        </div>

        {/* Related NFTs */}
        <div className="sm:col-span-12 md:col-span-4 space-y-4">
          {loadingNFTs ? (
            <Loader text="Loading related NFTs..." />
          ) : relatedNFTs.length > 0 ? (
            relatedNFTs.map((nft, index) => (
              <div
                key={nft._id || index}
                className="flex items-start gap-4 rounded-2xl p-4 bg-white shadow-lg"
              >
                <Image
                  width={100}
                  height={100}
                  src={nft.image.url}
                  alt={nft.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl"
                />
                <div className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-sm">{nft.name}</span>
                  <div className="flex items-center gap-2">
                    <Image
                      width={100}
                      height={100}
                      src={nft.image.url}
                      alt="Token"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="border-emerald-500 flex items-center border-2 px-2 py-1 rounded-2xl">
                      <Image
                        width={100}
                        height={100}
                        src={nft.image.url}
                        alt="Token"
                        className="w-4 h-4"
                      />
                      <span className="ml-1 text-xs font-light text-emerald-500">
                        {nft.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No related NFTs available.</p>
          )}
        </div>

        {/* Collections List */}
        <div className="sm:col-span-12 md:col-span-3 border-l-0 md:border-l-2 border-gray-100 p-4">
          <div className="flex flex-col mb-6">
            <div>
              <h2 className="text-lg font-bold">TOP COLLECTIONS OVER</h2>
              <p className="text-gray-400 text-sm">Last 24 Hours</p>
            </div>
            <div className="flex justify-end">
              <button className="w-fit text-blue-400 border border-blue-400 rounded-full px-4 py-1">
                More
              </button>
            </div>
          </div>
          {loadingCollections ? (
            <Loader text="Loading collections..." />
          ) : collections.length > 0 ? (
            <div className="space-y-6">
              {collections.map((collection, index) => (
                <div
                  key={collection._id || index}
                  className="flex items-center justify-between border-b-2 border-gray-100 py-2 gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg w-6">{index + 1}</span>
                    <Image
                      width={100}
                      height={100}
                      src={collection.image.url}
                      alt={collection.name}
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="font-semibold text-sm">{collection.name}</p>
                    {/* <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                      <Image
                        width={100}
                        height={100}
                        src={collection.image.url}
                        alt="Token"
                        className="w-4 h-4"
                      />
                      {collection.price && <span>{collection.price}</span>}
                    </div> */}
                  </div>
                  <div className="text-right">
                    <span className="text-green-500">
                      {collection.change || ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No collections available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;
