import Image from "next/image";
import React from "react";

interface StakeCardProps {
  data: {
    id: string;
    image: string;
    title: string;
    level: string;
    discount: string;
    status: string;
    priceRange: string;
    income: string;
    fee: string;
  };
  onStakeClick: (data: any) => void;
}

const StakeCard: React.FC<StakeCardProps> = ({ data, onStakeClick }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image
        width={100}
        height={100}
        src={data.image}
        alt={data.title}
        className="w-full h-14 rounded-lg object-cover mb-3"
      />

      {/* Title & Level */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-light">{data.title}</h2>
        <span className="text-gray-400 cursor-pointer">ℹ️</span>
      </div>
      <p className="text-green-600 text-md">{data.level}</p>

      {/* Discount */}
      <div className="bg-blue-300 text-xs text-white px-2 py-1 rounded-md w-max mt-2">
        {data.discount}
      </div>

      {/* Status & Price */}
      <p className="mt-3 text-gray-600">
        <strong>Status:</strong>{" "}
        <span className="text-green-600">{data.status}</span>
      </p>
      <p className="text-gray-600">
        <strong>Price Range:</strong> 💰 {data.priceRange}
      </p>
      <p className="text-gray-600">
        <strong>Income:</strong> {data.income}
      </p>
      <p className="text-gray-600">
        <strong>Handling Fee:</strong> {data.fee}
      </p>

      {/* Button */}
      <button
        className="mt-4 w-full py-2 bg-blue-700 text-white rounded-lg font-semibold"
        onClick={() => onStakeClick(data)}
      >
        Go to stake
      </button>
    </div>
  );
};

export default StakeCard;
