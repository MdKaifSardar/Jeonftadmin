"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlignJustify,
  Bell,
  FileKey,
  Headset,
  Mail,
  Wallet,
  Search,
} from "lucide-react";
import { earn, tg, lang, account } from "@/assets/landingPage/navbar";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/60 shadow-md text-black"
          : "bg-blue-900"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743277563/jeonft_i0w05z.png"
            alt="Logo"
            width={96}
            height={96}
            className="w-24 rounded-2xl bg-blue-900"
          />
        </Link>

        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AlignJustify className="w-8 h-8" />
        </button>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}
        >
          <Link
            href="/explore"
            className="font-semibold cursor-pointer hover:opacity-80 mb-4 md:mb-0"
          >
            Explore
          </Link>
          <Link
            href="/collection"
            className="font-semibold cursor-pointer hover:opacity-80 mb-4 md:mb-0"
          >
            Earn
          </Link>
          <Link
            href="/store/defi"
            className="font-semibold cursor-pointer hover:opacity-80 mb-4 md:mb-0"
          >
            Reserve
          </Link>
          <div className="relative w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Select"
                className="border border-gray-500 rounded-full w-full md:w-72 p-2 px-5 placeholder:text-gray-400 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Section - Icons & Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/announcements" className="relative cursor-pointer">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
          </Link>
          <Link
            href="/rewards"
            className="text-lg font-semibold cursor-pointer hover:opacity-80"
          >
            Airdrop
          </Link>
          <button>
            <Image src={earn} alt="Earn" width={28} height={28} />
          </button>
          <button>
            <Image src={tg} alt="Telegram" width={28} height={28} />
          </button>
          <button>
            <Image src={lang} alt="Language" width={28} height={28} />
          </button>

          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <AlignJustify className="w-8 h-8" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                <div className="p-2 space-y-2">
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full cursor-pointer rounded-lg">
                    <Headset className="w-6" />
                    Service
                  </button>
                  <Link
                    href="/user"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full cursor-pointer rounded-lg"
                  >
                    <Image src={account} alt="Account" width={24} height={24} />
                    Account
                  </Link>
                  <Link
                    href="/wallet"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full cursor-pointer rounded-lg"
                  >
                    <Wallet className="w-6" />
                    Wallet
                  </Link>
                  <Link
                    href="/message"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full cursor-pointer rounded-lg"
                  >
                    <Mail className="w-6" />
                    Message
                  </Link>
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full rounded-lg">
                    <FileKey className="w-6" />
                    Security TAP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/announcements" className="relative cursor-pointer">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
          </Link>
          <button>
            <Image src={earn} alt="Earn" width={28} height={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
