"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  getUserDetails,
  updateUsername,
  updatePassword,
} from "@/lib/actions/user.actions";
import { getWalletById } from "@/lib/actions/wallet.actions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import "react-toastify/dist/ReactToastify.css";
import UserIncomeComp from "../UserIncomeComp";

const UserDashComp = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletDetails, setWalletDetails] = useState<any>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userError, setUserError] = useState<string>("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        setUserError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const response = await getUserDetails(userId);
      setIsLoading(false);

      if (response.success) {
        setUserDetails(response.user);
        setUserError("");
      } else {
        toast.error(response.error);
        setUserError(response.error || "Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const getWalletDetails = async () => {
      if (!userDetails) return;

      // Check if walletId exists and is not empty.
      const walletId = userDetails.walletId?._id || userDetails.walletId;
      if (!walletId) {
        console.log("No wallet associated with user");
        return;
      }

      setWalletLoading(true);
      try {
        const result = await getWalletById(walletId);
        if (result.success) {
          setWalletDetails(result.data);
        } else {
          toast.error(result.error || "Failed to fetch wallet details");
        }
      } catch (error) {
        console.error("Wallet fetch error:", error);
        toast.error("Error fetching wallet details");
      } finally {
        setWalletLoading(false);
      }
    };

    getWalletDetails();
  }, [userDetails]);

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    const response = await updateUsername(userId, newUsername);
    if (response.success) {
      setUserDetails(response.user);
      toast.success("Username updated successfully.");
    } else {
      toast.error(response.error);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword.trim()) {
      toast.error("Password cannot be empty.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    const response = await updatePassword(userId, newPassword);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="p-8 bg-white text-black mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* User Details Box */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Loader text="Loading user details..." />
            </div>
          ) : userError ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-center">{userError}</p>
            </div>
          ) : userDetails ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* ...existing user details rendering... */}
              <h2 className="text-lg font-bold mb-4">User Details</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-700">{userDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Username:</span>
                  <span className="text-gray-700">{userDetails.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Referral Link:</span>
                  <span className="text-gray-700 break-all">
                    {userDetails.referralLink || "Not available"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Your Referral Code:</span>
                  <span className="text-gray-700">
                    {userDetails.userReferralCode || "Not available"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-center">
                No user details available. Please try reloading or contact support.
              </p>
            </div>
          )}

          {/* Income Details Box */}
          <UserIncomeComp />

          {/* Wallet Details Box */}
          {walletLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Loader text="Loading wallet details..." />
            </div>
          ) : walletDetails ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Wallet Details</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-gray-700 break-all">
                    {walletDetails.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">ETH Balance:</span>
                  <span className="text-gray-700">
                    {walletDetails.balance} ETH
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="font-medium">Token Balance:</span>
                  <span className="text-gray-700">
                    {walletDetails.tokenBalance || 0} JNFT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction Count:</span>
                  <span className="text-gray-700">
                    {walletDetails.transactionCount || 0}
                  </span>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 text-center">No wallet details available.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Update Username</h2>
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            />
            <button
              onClick={handleUpdateUsername}
              className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900 hover:opacity-90"
            >
              Update Username
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Update Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            />
            <button
              onClick={handleUpdatePassword}
              className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900 hover:opacity-90"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashComp;
