import React from "react";
import NFTCard from "@/components/NFTDetail/NFTCard";

interface NFT {
  id: string;
  image: string;
  title: string;
  price: string;
  change?: number;
}

interface FeaturedNFTProps {
  data: NFT[][];
}

const FeaturedNFT: React.FC<FeaturedNFTProps> = ({ data }) => {
  return (
    <div>
      <div className="bg-blue-900 px-4 sm:px-8 md:px-20 py-10 sm:py-14">
        {/* Heading */}
        <div className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-6 text-center sm:text-left text-white">
          FEATURED NFT COLLECTIBLES
        </div>

        {/* NFT Cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          {data.map((nftData, index) => (
            <div key={index} className="flex flex-wrap gap-4">
              {nftData.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNFT;