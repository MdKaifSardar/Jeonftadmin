"use client";
import Image from "next/image";
import { useState } from "react";

const Wallet = () => {
  const [showBEP20, setShowBEP20] = useState(false);
  const [showTRC20, setShowTRC20] = useState(false);

  const bep20Address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const trc20Address = "TJtjRj6wCYXHsaEF7zNnW5YEtmKQbMxsnZ";

  return (
    // <div style={{ backgroundImage: `url(${bg})` }}>
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4 px-16 pt-30">
        Wallet
      </h1>
      <div className="flex flex-col md:flex-row gap-4 bg-white text-black mx-auto p-10">
        <div className="max-w-5xl mx-auto p-4 ">
          {/* Assets Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Assets(USDT)</h1>

            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2">
                  T
                </div>
                <span className="font-medium">USDT</span>
              </div>
              <span className="text-2xl font-bold">18.28</span>
            </div>

            {/* Earnings Section */}
            <div className="flex space-x-8 mb-8">
              <div>
                <div className="text-gray-600 mb-1">Total Earnings</div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                    T
                  </div>
                  <span className="font-medium">2.29</span>
                </div>
              </div>

              <div>
                <div className="text-gray-600 mb-1">Withdrawn</div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                    T
                  </div>
                  <span className="font-medium">0</span>
                </div>
              </div>

              <div>
                <div className="text-gray-600 mb-1">Undrawn</div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                    T
                  </div>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit Addresses */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-4">
              <div className="relative mb-4">
                <select className="w-full p-3 border rounded-lg appearance-none pr-10">
                  <option>Node 1</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-10 flex items-center">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 border border-gray-300">
                    ?
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="font-medium">
                    USDT Deposit Address(BEP-20)
                  </span>
                  <button
                    className="ml-2 focus:outline-none cursor-pointer"
                    onClick={() => setShowBEP20(!showBEP20)}
                  >
                    {showBEP20 ? (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className="py-2 px-4 bg-gray-50 rounded border border-gray-200 text-gray-500 font-mono w-full overflow-x-auto whitespace-nowrap"
                  style={{ minHeight: "2rem" }}
                >
                  {showBEP20 ? bep20Address : bep20Address.replace(/./g, "*")}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <span className="font-medium">
                    USDT Deposit Address(TRC-20)
                  </span>
                  <button
                    className="ml-2 focus:outline-none"
                    onClick={() => setShowTRC20(!showTRC20)}
                  >
                    {showTRC20 ? (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className="py-2 px-4 bg-gray-50 rounded border border-gray-200 text-gray-500 font-mono w-full overflow-x-auto whitespace-nowrap"
                  style={{ minHeight: "2rem" }}
                >
                  {showTRC20 ? trc20Address : trc20Address.replace(/./g, "*")}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
              <div className="mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v8M8 12h8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-medium">Deposit</span>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
              <div className="mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    strokeWidth="2"
                  />
                  <path d="M8 12h8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-medium">Withdraw</span>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
              <div className="mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="font-medium">Settings</span>
            </div>
          </div>

          {/* Fiat Deposit Button */}
          <div className="mb-8">
            <button className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900">
              Deposit in fiat currency
            </button>
          </div>

          {/* History Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">History</h2>
              <div className="text-blue-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="font-medium">Trial fund</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-medium mr-2">+150</span>
                  <span className="bg-green-500 text-white text-xs py-1 px-2 rounded">
                    Success
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">2025/02/20 23:25:16</div>
            </div>
          </div>
        </div>
        <Image
          src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743186960/collection-images/zph5ehraactocpnqqnfh.jpg"
          alt="Background"
          className="w-full h-full md:w-1/2 md:h-1/2 "
        />
      </div>
    </div>
  );
};

export default Wallet;
