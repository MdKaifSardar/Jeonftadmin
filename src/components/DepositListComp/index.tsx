"use client";

import { useEffect, useState } from "react";
import { getDeposits } from "@/lib/actions/deposit.actions";
import { createWithdraw } from "@/lib/actions/withdraw.actions";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const getStateColor = (state: "pending" | "completed" | "failed") => {
  switch (state) {
    case "completed":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "failed":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

// Returns true if 180 days have passed since createdAt.
const isWithdrawEnabled = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const diffDays =
    (new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 180;
};

// Returns a string with the remaining time until withdraw is enabled.
const getTimeRemaining = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const totalMillis = 180 * 24 * 60 * 60 * 1000;
  const elapsedMillis = new Date().getTime() - createdDate.getTime();
  const remainingMillis = totalMillis - elapsedMillis;
  if (remainingMillis <= 0) {
    return "Available now";
  }
  const days = Math.floor(remainingMillis / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (remainingMillis % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor(
    (remainingMillis % (60 * 60 * 1000)) / (60 * 1000)
  );
  return `${days}d ${hours}h ${minutes}m`;
};

const DepositList = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      const id = localStorage.getItem("userId");
      if (!id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }
      setUserId(id);
      const result = await getDeposits(id);
      if (!result.success) {
        setError(result.message || "Failed to fetch deposits.");
      } else {
        setDeposits(result.data || []);
      }
      setLoading(false);
    };
    fetchDeposits();
  }, []);

  // Called when the user clicks withdraw on a deposit.
  const handleWithdraw = async (deposit: any) => {
    if (!userId) {
      toast.error("User is not logged in.");
      return;
    }
    // Pass deposit.amount to createWithdraw so it matches the deposit.
    const result = await createWithdraw(
      deposit._id,
      userId,
      deposit.walletId,
      deposit.amount
    );
    if (result.success) {
      toast.success("Withdraw created successfully.");
      // Optionally refresh deposits or trigger state updates as needed.
    } else {
      toast.error(result.message || "Failed to create withdraw.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <p className="text-red-600 text-center mt-4">Error: {error}</p>;
  }
  if (deposits.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No deposits exist.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Deposit History
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {deposits.map((deposit: any) => (
          <div
            key={deposit._id}
            className="relative bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Amount:</span>{" "}
                  <span className="text-gray-900">{deposit.amount} ETH</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`capitalize ${getStateColor(deposit.state)}`}
                  >
                    {deposit.state}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">
                    Admin Wallet:
                  </span>{" "}
                  <span className="text-gray-900">
                    {deposit.adminWalletAddress}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-medium text-gray-700">Wallet ID:</span>{" "}
                  <span className="text-gray-900">{deposit.walletId}</span>
                </p>
                <p className="mb-4">
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  <span className="text-gray-900">
                    {new Date(deposit.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    isWithdrawEnabled(deposit.createdAt)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!isWithdrawEnabled(deposit.createdAt)}
                  onClick={() => handleWithdraw(deposit)}
                >
                  Withdraw
                </button>
                {!isWithdrawEnabled(deposit.createdAt) && (
                  <p className="text-sm text-gray-600">
                    {getTimeRemaining(deposit.createdAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositList;
