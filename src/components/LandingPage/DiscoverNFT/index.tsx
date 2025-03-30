import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import Image from "next/image";

const categories = ["Polygon NFT", "Art", "Collectibles", "Gaming"];

const DiscoverNFTs = () => {
  const [direction, setDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nfts = [
    { id: "196270", price: "228 USDT", img: nft1 },
    { id: "375814", price: "228 USDT", img: nft2 },
    { id: "542718", price: "228 USDT", img: nft3 },
    { id: "133736", price: "228 USDT", img: nft4 },
    { id: "196271", price: "228 USDT", img: nft5 },
    { id: "375815", price: "228 USDT", img: nft6 },
    { id: "542719", price: "228 USDT", img: nft7 },
    { id: "133737", price: "228 USDT", img: nft8 },
  ];


  const handleCategoryClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 sm:gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold">DISCOVER MORE NFTS</h1>

        <div className="flex flex-col sm:flex-row justify-between w-full sm:w-auto gap-4 sm:gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(index)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm ${
                  currentIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black"
                } hover:bg-gray-200 transition-all`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="px-3 text-black sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 transition-all">
            All Filters
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {nfts.map((nft) => (
              <motion.div
                key={nft.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square mb-2 sm:mb-4">
                  <Image
                    src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                    alt={`NFT ${nft.id}`}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                  <Image
                    src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                    alt="Stake logo"
                    className="absolute bottom-1 left-2 sm:left-3 w-8 sm:w-10 h-8 sm:h-10 rounded-xl sm:rounded-2xl"
                  />
                </div>

                <div className="px-1 sm:px-2">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                    NFT_{nft.id}
                  </h3>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Image src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png" alt="Token" className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-sm sm:text-base text-gray-600">
                      {nft.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full mt-6 sm:mt-8 flex justify-center">
        <button className="p-2 sm:p-3 px-4 sm:px-6 rounded-full bg-white text-xs sm:text-sm md:text-base font-semibold text-black hover:opacity-90 transition-opacity">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default DiscoverNFTs;