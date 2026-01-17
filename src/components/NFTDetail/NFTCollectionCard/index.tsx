import { FaCheckCircle, FaTwitter, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { BiSort } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

interface NFTCollectionData {
  image: string;
  title: string;
  logo: string;
  author: string;
  items: number;
  owner: number;
  volume: string;
  floor_price: string;
  bio: string;
}

const NFTCollectionCard = ({ data }: { data: NFTCollectionData }) => {
  const { image, title, logo, author, items, owner, volume, floor_price, bio } =
    data;
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to toggle bio text
  const toggleBio = () => setExpanded(!expanded);

  // Function to copy NFT page URL
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden py-8 mt-10 text-black">
      {/* Banner */}
      <div className="relative w-full h-40 sm:h-60">
        <Image
          width={100}
          height={100}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-4 sm:gap-8 p-4 sm:p-6 -mt-12">
          <div className="relative">
            <Image
              src={logo}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
          <div className="text-center">
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900 flex items-center justify-center">
              {title} <FaCheckCircle className="ml-2 text-blue-500" />
            </h2>
            <p className="text-gray-500 dark:text-gray-400">By {author}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-center gap-4 sm:gap-20 px-4 sm:px-6 pb-6 text-center mb-8">
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              {items}
            </p>
            <p className="text-gray-500 text-sm sm:text-lg font-light">Items</p>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              {owner}
            </p>
            <p className="text-gray-500 text-sm sm:text-lg font-light">
              Owners
            </p>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xl sm:text-2xl font-semibold text-green-500">
              {volume}
            </p>
            <p className="text-gray-500 text-sm sm:text-lg font-light">
              Volume Traded
            </p>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xl sm:text-2xl font-semibold text-green-500">
              {floor_price}
            </p>
            <p className="text-gray-500 text-sm sm:text-lg font-light">
              Floor Price
            </p>
          </div>
        </div>
      </div>

      {/* Bio and Share Section */}
      <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-12 border-t-2 border-gray-200">
        <div className="px-4 sm:px-6 pb-4 sm:pb-0 sm:w-2/3">
          <h3 className="text-lg font-semibold text-gray-900">BIO</h3>
          <p className="text-gray-500">
            {expanded ? bio : `${bio.substring(0, 50)}...`}
          </p>
          <button
            onClick={toggleBio}
            className="text-blue-500 text-sm mt-1 focus:outline-none"
          >
            {expanded ? "See Less ▲" : "See More ▼"}
          </button>
        </div>

        {/* Share Section */}
        <div className="px-4 sm:px-6 pb-4 flex flex-col items-start gap-2 sm:w-1/3">
          <h3 className="text-lg font-semibold text-gray-900">Share</h3>
          <div className="flex space-x-3 p-2">
            <a
              href={`https://twitter.com/intent/tweet?text=Check out this NFT: ${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-700 hover:text-blue-500 text-xl cursor-pointer" />
            </a>
            <FaShareAlt
              className="text-gray-700 hover:text-blue-500 text-xl cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-16 py-6 justify-end w-full">
        <div className="flex relative w-full sm:w-fit">
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter name to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-fit pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-4 justify-start">
          <select className="w-fit px-4 md:pr-8 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-400">
            <option value="none"></option>
            <option value="price">Price</option>
            <option value="theme">Theme</option>
          </select>
          <button className="w-full sm:w-fit p-2 rounded-full bg-blue-900">
            <BiSort className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionCard;
