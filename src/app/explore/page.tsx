"use client";

import { useState } from "react";
import { polygonNFTData } from "@/data/nftdetail";
import { stakingData, freeZoneData } from "@/data/staking_freezone";
import NFTStakeDetail from "@/components/Explore/NFTStakeDetail";
import PolygonNftCard from "@/components/Explore/PolygonNftCard";
import StakeCard from "@/components/Explore/StakeCard";

const Explore = () => {
  const [activeZone, setActiveZone] = useState<"Exclusive" | "Free">(
    "Exclusive"
  );
  const [activeTab, setActiveTab] = useState<
    "Stake" | "Polygon NFT" | "Art" | "Collectibles"
  >("Stake");
  const [activeSubTab, setActiveSubTab] = useState<
    "Stake" | "Collection" | "My Stake"
  >("Stake");
  const [selectedStake, setSelectedStake] = useState<any | null>(null);

  const handleTabClick = (tab: typeof activeTab) => {
    if (selectedStake) setSelectedStake(null);
    setActiveTab(tab);
    setActiveSubTab(tab === "Stake" ? "Stake" : "Collection");
  };

  const handleSubTabClick = (subTab: typeof activeSubTab) => {
    if (selectedStake) setSelectedStake(null);
    setActiveSubTab(subTab);
  };

  const handleStakeClick = (stakeData: any) => setSelectedStake(stakeData);

  const handleBackToStakes = () => setSelectedStake(null);

  return (
    <div>
      <div className="mx-auto bg-cover bg-center bg-no-repeat">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 px-16 pt-30">
          Explore
        </h1>
        {/* Navigation Tabs */}
        <div className="bg-white w-full px-4 lg:px-16 py-4 lg:py-8">
          {!selectedStake && (
            <>
              <div className="flex overflow-x-auto gap-4 lg:gap-6 border-b border-gray-200 text-gray-600">
                <span
                  className={`p-2 cursor-pointer whitespace-nowrap ${
                    activeTab === "Stake"
                      ? "text-black font-semibold border-b-6 border-blue-900"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Stake")}
                >
                  Stake
                </span>
                <span
                  className={`p-2 cursor-pointer whitespace-nowrap ${
                    activeTab === "Polygon NFT"
                      ? "text-black font-semibold border-b-6 border-blue-900"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Polygon NFT")}
                >
                  Polygon NFT
                </span>
                <span
                  className={`p-2 cursor-pointer whitespace-nowrap ${
                    activeTab === "Art"
                      ? "text-black font-semibold border-b-6 border-blue-900"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Art")}
                >
                  Art
                </span>
                <span
                  className={`p-2 cursor-pointer whitespace-nowrap ${
                    activeTab === "Collectibles"
                      ? "text-black font-semibold border-b-6 border-blue-900"
                      : ""
                  }`}
                  onClick={() => handleTabClick("Collectibles")}
                >
                  Collectibles
                </span>
              </div>

              {/* Sub Navigation */}
              {activeTab === "Stake" && (
                <div className="flex overflow-x-auto gap-4 lg:gap-6 my-4 text-gray-500 border-b border-gray-200">
                  <span
                    className={`p-2 cursor-pointer whitespace-nowrap ${
                      activeSubTab === "Stake"
                        ? "text-black font-semibold border-b-3 border-blue-900"
                        : ""
                    }`}
                    onClick={() => handleSubTabClick("Stake")}
                  >
                    Stake
                  </span>
                  <span
                    className={`p-2 cursor-pointer whitespace-nowrap ${
                      activeSubTab === "Collection"
                        ? "text-black font-semibold  border-b-3 border-blue-900"
                        : ""
                    }`}
                    onClick={() => handleSubTabClick("Collection")}
                  >
                    Collection
                  </span>
                  <span
                    className={`p-2 cursor-pointer whitespace-nowrap ${
                      activeSubTab === "My Stake"
                        ? "text-black font-semibold border-b-3 border-blue-900"
                        : ""
                    }`}
                    onClick={() => handleSubTabClick("My Stake")}
                  >
                    My Stake
                  </span>
                </div>
              )}

              {/* Zones */}
              {activeTab === "Stake" && activeSubTab === "Stake" && (
                <div className="flex gap-4 lg:gap-6 mb-4 p-3 text-blue-900">
                  <span
                    className={`font-semibold pb-2 cursor-pointer whitespace-nowrap ${
                      activeZone === "Exclusive"
                        ? "border-b-2 border-blue-900"
                        : ""
                    }`}
                    onClick={() => setActiveZone("Exclusive")}
                  >
                    Exclusive Zone
                  </span>
                  <span
                    className={`cursor-pointer whitespace-nowrap ${
                      activeZone === "Free" ? "border-b-2 border-blue-900" : ""
                    }`}
                    onClick={() => setActiveZone("Free")}
                  >
                    Free Zone
                  </span>
                </div>
              )}
            </>
          )}

          {/* Stake Detail View */}
          {selectedStake ? (
            <NFTStakeDetail
              stakeData={selectedStake}
              onBack={handleBackToStakes}
            />
          ) : (
            <>
              {/* Cards */}
              {activeTab === "Stake" && activeSubTab === "Stake" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 text-sm">
                  {(activeZone === "Exclusive"
                    ? stakingData
                    : freeZoneData
                  ).map((stake) => (
                    <StakeCard
                      key={stake.id}
                      data={{...stake, id: stake.id.toString(), image: stake.image.src}}
                      onStakeClick={handleStakeClick}
                    />
                  ))}
                </div>
              )}

              {/* Placeholder for Other Tabs */}
              {activeTab === "Polygon NFT" && (
                <div className="my-8 flex flex-wrap gap-2 text-center text-gray-500">
                  <PolygonNftCard
                    key="demo-nft"
                    data={{
                      id: "demo-nft",
                      image: "/path/to/demo-image.jpg",
                      title: "Demo NFT",
                      logo: "/path/to/demo-logo.jpg",
                    }}
                  />
                </div>
              )}

              {activeTab === "Art" && (
                <div className="my-8 flex flex-wrap gap-4 text-center text-gray-500">
                  <PolygonNftCard
                    key="demo-nft"
                    data={{
                      id: "demo-nft",
                      image: "/path/to/demo-image.jpg",
                      title: "Demo NFT",
                      logo: "/path/to/demo-logo.jpg",
                    }}
                  />
                </div>
              )}

              {activeTab === "Collectibles" && (
                <div className="my-8 flex flex-wrap gap-4 text-center text-gray-500">
                  <PolygonNftCard
                    key="demo-nft"
                    data={{
                      id: "demo-nft",
                      image: "/path/to/demo-image.jpg",
                      title: "Demo NFT",
                      logo: "/path/to/demo-logo.jpg",
                    }}
                  />
                </div>
              )}

              {/* Placeholder for Other Sub-Tabs */}
              {activeTab === "Stake" && activeSubTab !== "Stake" && (
                <div className="my-8 text-center text-gray-500">
                  Content for {activeSubTab} will be displayed here.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
