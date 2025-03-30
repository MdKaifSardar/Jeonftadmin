"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Dashboard = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 mb-4 px-4 md:px-8 lg:px-16 pt-8 lg:pt-30 bg-white text-black">
        {/* Wallet Section */}
        <div className="bg-blue-100 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Profile */}
            <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col items-center justify-center border-r border-gray-100">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-green-200 mb-4"></div>

              {/* ID and UID with Eye Icon */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {showDetails ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <div className="text-gray-800">
                    {showDetails ? "ID: 987654321" : "************"}
                  </div>
                </div>
                <div className="text-gray-600">
                  {showDetails ? "UID: 123456789" : "************"}
                </div>
              </div>

              <div className="w-full max-w-xs mt-4">
                <div className="border border-gray-200 rounded-full py-2 px-4 flex items-center justify-center mb-3">
                  <span className="mr-2">🏆</span>
                  <span>Level 0</span>
                </div>

                <div className="border border-gray-200 rounded-full py-2 px-4 flex items-center justify-center">
                  <span>0 Points</span>
                </div>
              </div>

              <div className="mt-6 text-gray-600 flex items-center">
                <span>Level Information</span>
                <span className="ml-1">›</span>
              </div>
            </div>

            {/* Right Side - Balance */}
            <div className="w-full md:w-3/5 p-4 md:p-6 bg-white">
              <div className="mb-6 md:mb-8">
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2">
                    T
                  </div>
                  <span className="text-2xl md:text-3xl font-bold">18.28</span>
                </div>
                <div className="text-gray-700">Wallet Balance</div>

                <div className="flex mt-4 space-x-2">
                  <button className="px-4 py-2 bg-white rounded-full border border-gray-200 flex items-center">
                    <span className="mr-2">✉️</span>
                    <span>Message</span>
                  </button>

                  <button className="px-4 py-2 bg-white rounded-full border border-gray-200 flex items-center">
                    <span className="mr-2">📋</span>
                    <span>Mission</span>
                  </button>
                </div>
              </div>

              {/* Balance Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-gray-600 mb-2">Reserve</div>
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>0</span>
                  </div>
                  <div className="flex justify-center items-center mt-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>2.29</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-600 mb-2">Event Reward</div>
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>0</span>
                  </div>
                  <div className="flex justify-center items-center mt-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>0</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-600 mb-2">Team</div>
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>0</span>
                  </div>
                  <div className="flex justify-center items-center mt-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-1">
                      T
                    </div>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team and Orders Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Team Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4 md:mb-6">My Team</h2>

            <div className="flex flex-col sm:flex-row justify-between mb-4 md:mb-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">0</div>
                <div className="text-sm text-gray-600">Community rewards</div>
              </div>

              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">0</div>
                <div className="text-sm text-gray-600">Valid Members</div>
              </div>

              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">0</div>
                <div className="text-sm text-gray-600">A enthusiast</div>
              </div>

              <div className="text-center">
                <div className="text-xl font-semibold">0</div>
                <div className="text-sm text-gray-600">B+C enthusiasts</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">👥</div>
                <div className="text-sm text-center">Community enthusiasts</div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">🏆</div>
                <div className="text-sm text-center">
                  Community contributions
                </div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">📋</div>
                <div className="text-sm text-center">Community orders</div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">🔄</div>
                <div className="text-sm text-center">Referral</div>
              </div>
            </div>
          </div>

          {/* Orders Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl font-bold">My Orders</h2>
              <div className="text-gray-400 flex items-center">
                <span>Check Orders</span>
                <span className="ml-1">›</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mb-4 md:mb-6">
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">3</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>

              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">0</div>
                <div className="text-sm text-gray-600">Processing</div>
              </div>

              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-semibold">2</div>
                <div className="text-sm text-gray-600">Bought</div>
              </div>

              <div className="text-center">
                <div className="text-xl font-semibold">1</div>
                <div className="text-sm text-gray-600">Sold</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">👤</div>
                <div className="text-sm text-center">NFTs</div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">📄</div>
                <div className="text-sm text-center">Details</div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">💳</div>
                <div className="text-sm text-center">Deposit</div>
              </div>

              <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-blue-300 mb-2">💰</div>
                <div className="text-sm text-center">Withdraw</div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Functions Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4 md:mb-6">Common Functions</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
              <div className="text-blue-300 mb-2">✉️</div>
              <div className="text-sm text-center">Tutorials</div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
              <div className="text-blue-300 mb-2">⚙️</div>
              <div className="text-sm text-center">Settings</div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
              <div className="text-blue-300 mb-2">🪙</div>
              <div className="text-sm text-center">Mint</div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 flex flex-col items-center">
              <div className="text-blue-300 mb-2">🖼️</div>
              <div className="text-sm text-center">Collection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
