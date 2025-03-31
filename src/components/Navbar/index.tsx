"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify, Bell, Search, Menu } from "lucide-react";
import { verifyToken } from "@/utils/jwt";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/60 shadow-md text-black"
          : "bg-blue-900 text-white"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743277563/jeonft_i0w05z.png"
            alt="Logo"
            width={96}
            height={96}
            className="w-24 rounded-2xl"
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
            className="font-semibold text-lg cursor-pointer hover:opacity-80 mb-4 md:mb-0"
          >
            Explore
          </Link>
          <div className="relative w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-500 rounded-full w-full md:w-72 p-2 px-5 placeholder:text-gray-400 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Section - Icons & Menu */}
        <div className="flex items-center gap-6">
          <Link href="/announcements" className="relative cursor-pointer">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="font-semibold text-lg cursor-pointer hover:opacity-80"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="font-semibold text-lg cursor-pointer hover:opacity-80"
              >
                Signup
              </Link>
            </>
          ) : null}

          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:opacity-80"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {isDropdownOpen && (
              <div className="overflow-hidden absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                <Link
                  href="/user-dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <img
                    src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1743359634/unity_logo_2_caf6ec.png"
                    alt="Account Icon"
                    className="w-6 h-6"
                  />
                  Account
                </Link>
                <Link
                  href="/user-dashboard/user-wallet"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Wallet
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token"); // Remove token from localStorage
                      window.location.reload(); // Reload the page
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
