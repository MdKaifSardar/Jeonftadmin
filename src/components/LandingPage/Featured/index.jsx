import Image from "next/image";
import React from "react";

const NFTCard = ({ data }) => {
  return (
    <div className="p-5 w-full max-w-lg text-white">
      <div className="flex gap-4">
        <div className="w-3/4">
          <Image
            src={data[0]}
            alt="Wild Girl"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Small Images */}
        <div className="w-1/4 flex flex-col gap-3">
          <Image
            src={data[1]}
            alt="Thumbnail 1"
            className="w-full rounded-lg object-cover"
          />
          <Image
            src={data[2]}
            alt="Thumbnail 2"
            className="w-full rounded-lg object-cover"
          />
          <Image
            src={data[3]}
            alt="Thumbnail 3"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Title & Author */}
      <div className="mt-4 ">
        <h2 className="text-lg font-semibold">Wild Girl</h2>
        <div className="flex justify-between">
          <p className="text-gray-200 text-sm">
            by <span className="font-medium">BERNADETTE</span>
          </p>
          <div className="flex justify-end">
            <span className="bg-blue-200 text-gray-700 text-xs px-4 py-1 rounded-full">
              Total 4 Items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
