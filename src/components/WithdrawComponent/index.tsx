"use client";

import { useEffect, useState } from "react";
import { getWithdraws } from "@/lib/actions/withdraw.actions";
import Loader from "@/components/Loader";

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

const WithdrawComponent = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWithdraws = async () => {
      const id = localStorage.getItem("userId");
      if (!id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }
      setUserId(id);
      const result = await getWithdraws(id);
      if (!result.success) {
        setError(result.message || "Failed to fetch withdraws.");
      } else {
        setWithdraws(result.data || []);
      }
      setLoading(false);
    };
    fetchWithdraws();
  }, []);

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
  if (withdraws.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No withdraws exist.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Withdraw History
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {withdraws.map((withdraw: any) => (
          <div
            key={withdraw._id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <p className="mb-2">
              <span className="font-medium text-gray-700">Amount:</span>{" "}
              <span className="text-gray-900">
                {withdraw.amount} {withdraw.unit ? withdraw.unit.toUpperCase() : ""}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-700">Status:</span>{" "}
              <span className={`capitalize ${getStateColor(withdraw.state)}`}>
                {withdraw.state}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-700">Deposit ID:</span>{" "}
              <span className="text-gray-900">{withdraw.depositId}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-700">Created At:</span>{" "}
              <span className="text-gray-900">
                {new Date(withdraw.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawComponent;