"use client";

import { getUserRewards } from "@/lib/actions/reward.actions";
import { addRewardToUserBalance } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

interface Reward {
  rewardId: string;
  amount: number;
  userId: string;
  createdAt: string;
  status: string; // ✅ Added status
}

const UserRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      toast.error("User ID not found in localStorage.");
      return;
    }

    setUserId(id);
    fetchRewards(id);
  }, []);

  const fetchRewards = async (id: string) => {
    setLoading(true);
    try {
      const response = await getUserRewards(id);
      if (!response.success) {
        setError(response.message || "Failed to fetch rewards.");
        toast.error(response.message || "Failed to fetch rewards.");
        return;
      }

      const formattedRewards: Reward[] = (response.data || []).map(
        (r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt).toISOString(),
          status: r.status, // make sure this exists
        })
      );

      setRewards(formattedRewards);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching rewards.");
      toast.error("An error occurred while fetching rewards.");
    } finally {
      setLoading(false);
    }
  };

  const handleReceive = async (rewardId: string, amount: number) => {
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      const response = await addRewardToUserBalance(userId, amount, rewardId);

      if (!response || !response.success) {
        toast.error(response?.message || "Failed to add reward to balance.");
        return;
      }

      toast.success("Reward received and balance updated!");
      setStatus("Reward received successfully!");
      fetchRewards(userId); // ✅ Refresh rewards
    } catch (err: any) {
      console.error("Reward receive error:", err);
      toast.error(
        err?.message ||
          "An unexpected error occurred while receiving the reward."
      );
    }
  };

  if (loading) return <Loader text="Loading rewards..." />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="w-[70%] flex flex-col justify-center mx-auto items-center p-4">
      <h2 className="text-xl font-bold mb-4">Your Rewards</h2>

      {status && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded">
          {status}
        </div>
      )}

      {rewards.length === 0 ? (
        <p>No rewards found.</p>
      ) : (
        <ul className="w-full space-y-4">
          {rewards.map((reward) => (
            <li
              key={reward.rewardId}
              className="w-full bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-900">
                    Amount: {reward.amount.toFixed(5)} ETH
                  </p>
                  <p className="text-sm text-gray-600">
                    Created on: {new Date(reward.createdAt).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      reward.status === "received"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {reward.status}
                  </p>
                </div>

                {/* ✅ Show "Receive" button only if status !== "received" */}
                {reward.status !== "received" && (
                  <button
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() =>
                      handleReceive(reward.rewardId, reward.amount)
                    }
                  >
                    Receive
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRewards;
