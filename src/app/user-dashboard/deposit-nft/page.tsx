"use client";

import { useState } from "react";
import { CheckCircle, Lock, ChevronRight } from "lucide-react";
import deposit from "@/assets/Earn/deposit.webp";
import Image from "next/image";

const DepositNFT = () => {
  const [selectedChain, setSelectedChain] = useState("Polygon");

  const chains = [
    { name: "Polygon", icon: "🟣", supported: true },
    { name: "BSC", icon: "🟡", supported: false },
    { name: "OKC", icon: "🟢", supported: false },
  ];

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-semibold  mb-4 px-4 lg:px-16 pt-25">
          Deposit NFT
        </h1>

        {/* Card Box */}
        <div className="flex flex-col md:flex-row justify-center gap-20 mx-auto relative bg-white p-10  shadow-xl w-full">
          <div className=" w-full md:w-1/4 my-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              Choose Chain
            </h2>
            <p className="text-gray-500 text-sm">Currently supports Polygon</p>

            {/* Chain Selection */}
            <div className="mt-4 space-y-4">
              {chains.map((chain) => (
                <button
                  key={chain.name}
                  className={`flex items-center justify-between w-full p-4 rounded-lg text-lg font-medium ${
                    selectedChain === chain.name
                      ? "border-2 border-blue-500 bg-blue-100 shadow-md"
                      : "border border-gray-300 bg-gray-50"
                  }`}
                  onClick={() => setSelectedChain(chain.name)}
                  disabled={!chain.supported}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{chain.icon}</span>
                    <span className="text-gray-800">{chain.name}</span>
                  </div>
                  {chain.supported ? (
                    selectedChain === chain.name ? (
                      <CheckCircle className="text-blue-500" size={22} />
                    ) : null
                  ) : (
                    <Lock className="text-gray-400" size={20} />
                  )}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={selectedChain !== "Polygon"}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
          <Image
            src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
            alt=""
            className="w-110 h-1/2 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DepositNFT;
