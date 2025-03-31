"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo Section */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-green-300 rounded-lg" />
              <span className="text-xl font-semibold">
                JEO <span className="text-gray-500">NFT</span>
              </span>
            </div>
            <p className="mt-2 text-white text-sm">
              JEONFT is a Web3 revenue platform based on NFT collections
            </p>
          </div>

          {/* Resources Section */}
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-6">Resources</h3>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="cursor-pointer">Docs</li>
              <li className="cursor-pointer">Invite friends</li>
              <li className="cursor-pointer">How to buy</li>
              <li className="cursor-pointer">Tutorials</li>
              <li className="cursor-pointer">Artist Application Form</li>
            </ul>
          </div>

          {/* News Section */}
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-6">News</h3>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li>Blog</li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="md:col-span-4">
            <h3 className="text-white font-medium mb-6">Company</h3>
            <p className="text-blue-100 text-sm mb-6">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT listing, tips and tricks for navigating Treasure
              webpage.
            </p>

            {/* Email Input */}
            <div className="relative mb-12">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none text-sm"
              />
              <button className="absolute right-1.5 top-1.5 px-8 py-2 bg-white text-blue-900 hover:bg-blue-100 transition-all rounded-full text-sm">
                Submit
              </button>
            </div>

            {/* Download Section */}
            <h3 className="text-white font-medium mb-6">Download</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-400 rounded-2xl p-4 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src="/api/placeholder/120/120"
                  alt="App Store QR"
                  className="w-full"
                />
              </div>
              <div className="bg-green-300 rounded-2xl p-4 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src="/api/placeholder/120/120"
                  alt="Google Play QR"
                  className="w-full"
                />
              </div>
              <div className="bg-red-200 rounded-2xl p-4 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src="/api/placeholder/120/120"
                  alt="APK QR"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-gray-400 text-xs font-semibold">
          <p>© 2023 - JEOMeta Technology, Inc</p>
          <div className="mt-1">
            <span className="mx-3">Privacy Policy</span>
            <span className="mx-3">Terms of service</span>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="hidden md:fixed bottom-6 right-6 bg-gradient-to-r from-blue-400 to-green-300 text-white rounded-full p-4 shadow-lg">
        <span className="flex items-center gap-2">
          <span className="text-xl">💬</span>
          <span>Help</span>
        </span>
      </button>

      {/* Mobile Navigation Bar - Centered */}
      <div className="fixed md:hidden bottom-10 left-0 right-0 mx-auto w-full max-w-md px-2">
        <div className="flex flex-wrap text-gray-400 font-light items-center justify-between text-lg p-3 bg-gray-100 rounded-full shadow-2xl shadow-black">
          <Link href="/stake" className="pl-2 cursor-pointer">
            Stake
          </Link>
          <Link
            href="/collection"
            className="px-3 border-r border-l border-gray-400 cursor-pointer"
          >
            Earn
          </Link>
          <Link href="/store/defi" className="cursor-pointer">
            Reserve
          </Link>
          <Link
            href="/rewards"
            className="px-3 border-r border-l border-gray-400 cursor-pointer"
          >
            Assets
          </Link>
          <Link href="/user" className="pr-2 cursor-pointer">
            My
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
