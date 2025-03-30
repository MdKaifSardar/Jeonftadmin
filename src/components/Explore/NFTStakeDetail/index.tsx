import React, { useState, useEffect } from "react";
import { ChevronLeft, RefreshCw } from "lucide-react";
import NFTCard from "../../NFTDetail/NFTCard";

interface StakeData {
  id: string;
  title: string;
  priceRange: string;
  level: string;
  income: string;
}

interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  tokenId: number;
  level: string;
  income: string;
}

interface NFTStakeDetailProps {
  stakeData: StakeData;
  onBack: () => void;
}

const NFTStakeDetail: React.FC<NFTStakeDetailProps> = ({ stakeData, onBack }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const priceRange = stakeData.priceRange.split("~");
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);

      const mockNfts = Array.from({ length: 12 }, (_, i) => {
        const price = minPrice + Math.floor(Math.random() * (maxPrice - minPrice));
        return {
          id: `${stakeData.id}-nft-${i}`,
          name: `${stakeData.title} NFT #${i + 1}`,
          image: `/path/to/image-${i}.jpg`,
          price,
          tokenId: Math.floor(100000 + Math.random() * 900000),
          level: stakeData.level,
          income: stakeData.income,
        };
      });

      setNfts(mockNfts);
      setFilteredNfts(mockNfts);
      setLoading(false);
    };

    fetchNFTs();
  }, [stakeData]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Return</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="animate-spin text-gray-500" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredNfts.map((nft, index) => (
              <div
                key={nft.id}
                className="transform transition-all duration-500 ease-in-out"
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-in-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Pass a demo NFT */}
                <NFTCard
                  nft={{
                    id: "demo-nft",
                    image: "/path/to/demo-image.jpg",
                    title: "Demo NFT",
                    price: "10 ETH",
                    change: 5,
                  }}
                />
                <button className="rounded-xl w-full mt-2 text-sm bg-blue-500 text-white hover:text-gray-900 p-3">
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          {filteredNfts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No NFTs available for this stake option
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NFTStakeDetail;
