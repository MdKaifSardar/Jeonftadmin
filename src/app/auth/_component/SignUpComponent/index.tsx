"use client";

import { useState } from "react";
import { signup } from "@/lib/actions/auth/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(
        email,
        username,
        password,
        referralCode || undefined
      );
      if (response.success) {
        if (response.token) {
          localStorage.setItem("token", response.token); // Save token to localStorage
        }
        if (response.userId) {
          localStorage.setItem("userId", String(response.userId)); // Save userId to localStorage
        }
        toast.success(response.message);
        router.push("/"); // Redirect to the home page
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="p-[2rem] mt-[4rem] gap-[.5rem] flex flex-col md:flex-row w-full h-full justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg p-[2rem] rounded-[2rem] flex items-center justify-center w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 flex items-center justify-center mb-4">
              <Image
                width={100}
                height={100}
                src="https://res.cloudinary.com/dlly7wr0a/image/upload/v1744097716/jeonft_logo_new_zgpy5x.jpg"
                alt="NFT"
                className="rounded-2xl"
              />
            </div>
            <div className="text-blue-900 font-bold text-3xl flex items-center">
              JEO <span className="ml-2">NFT</span>
            </div>
          </div>

          <h1 className="text-2xl text-blue-900 font-bold text-center mb-6">
            Sign Up
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              User name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="reset"
              className="w-1/2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-900 rounded-lg py-2 text-white font-medium hover:opacity-90"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
