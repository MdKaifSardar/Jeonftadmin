"use client";

import Image from "next/image";
import { useState } from "react";
import { login } from "@/lib/actions/auth/login.actions";
import { toast } from "react-toastify";
import Link from "next/link";

interface TreasureNFTLoginModalProps {
  onClose: () => void;
}

const TreasureNFTLoginModal: React.FC<TreasureNFTLoginModalProps> = ({
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = async () => {
    try {
      const response = await login(email, password);
      if (response.success) {
        if (response.token) {
          localStorage.setItem("token", response.token); // Save token in localStorage
        }
        if (response.userId) {
          localStorage.setItem("userId", String(response.userId)); // Save userId to localStorage
        }
        toast.success(response.message);
        onClose(); // Close the modal on successful login
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-100">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-8 rounded-t-2xl pb-8 bg-blue-900">
          <div className="w-28 h-28 flex items-center justify-center mb-4">
            <div className="relative">
              <div className="relative flex items-center justify-center p-2">
                <Image
                  width={100}
                  height={100}
                  src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1744097716/jeonft_logo_new_zgpy5x.jpg"
                  alt="NFT"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="text-white font-bold text-3xl flex items-center">
            JEO <span className="text-white ml-2">NFT</span>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl text-blue-900 font-bold text-center mb-6">
            Log in
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                type="button"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      showPassword
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button
              className="text-blue-900 text-sm hover:underline"
              onClick={() => alert("Forgot Password clicked!")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              className="w-1/2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-1/2 bg-blue-900 rounded-lg py-2 text-white font-medium hover:opacity-90"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/auth/signup"
              className="text-blue-900 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureNFTLoginModal;
