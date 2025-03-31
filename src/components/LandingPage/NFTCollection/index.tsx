import React from "react";
import { nft1, nft2, nft3, nft4, sign } from "../../../assets/landingPage/nft";
import Image from "next/image";

const NFTMarketplace = () => {
  const collections = [
    {
      id: 1,
      name: "Giffgaff Ape Club",
      price: "3621.11M",
      change: "+2.07%",
      img: nft1,
    },
    {
      id: 2,
      name: "Wild Girl",
      price: "3497.04M",
      change: "+2.12%",
      img: nft2,
    },
    {
      id: 3,
      name: "Pixels Punk",
      price: "3582.13M",
      change: "+2.07%",
      img: nft3,
    },
    {
      id: 4,
      name: "YoungLady",
      price: "3552.9M",
      change: "+2.08%",
      img: nft4,
    },
    {
      id: 5,
      name: "Penguin Pals",
      price: "3662.98M",
      change: "+2.02%",
      img: nft1,
    },
  ];

  const relatedNFTs = [
    {
      id: "281658",
      price: "203.91",
      img: "https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png",
    },
    {
      id: "380087",
      price: "203.36",
      img: "https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png",
    },
    {
      id: "380087",
      price: "203.36",
      img: "https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png",
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-10 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
        {/* Main NFT Display */}
        <div className="sm:col-span-12 md:col-span-5">
          <div className="flex flex-col gap-4 rounded-3xl p-4 bg-white shadow-lg">
            <Image
              width={100}
              height={100}
              src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
              alt="PEPE Frog"
              className="w-full rounded-3xl"
            />
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                  alt="Small PEPE"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-lg font-bold">
                  PEPE_Frog_Nobility_405802
                </span>
              </div>

              <div className="flex flex-col gap-1 items-end">
                <div className="text-xs font-light">Highest bid</div>
                <div className="text-sm flex items-center gap-1">
                  <Image
                    width={100}
                    height={100}
                    src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                    alt="Token"
                    className="w-4 h-4"
                  />
                  <div className="text-sm text-gray-500">228.57K USDT</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related NFTs */}
        <div className="sm:col-span-12 md:col-span-4 space-y-4">
          {relatedNFTs.map((nft, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl p-4 bg-white shadow-lg"
            >
              <Image
                width={100}
                height={100}
                src={nft.img}
                alt={`PEPE ${nft.id}`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl"
              />
              <div className="flex flex-col items-start gap-2">
                <span className="font-semibold text-sm">
                  PEPE_Frog_Nobility_{nft.id}
                </span>
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    src={nft.img}
                    alt="Token"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="border-emerald-500 flex items-center border-2 px-2 py-1 rounded-2xl">
                    <Image
                      width={100}
                      height={100}
                      src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
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
          ))}
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

          <div className="space-y-6">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="flex items-center justify-between border-b-2 border-gray-100 py-2 gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg w-6">{index + 1}</span>
                  <Image
                    width={100}
                    height={100}
                    src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                    alt={collection.name}
                    className="w-14 h-14 rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold text-sm">{collection.name}</p>
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                    <Image
                      width={100}
                      height={100}
                      src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                      alt="Token"
                      className="w-4 h-4"
                    />
                    <span>{collection.price}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-500">{collection.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;
