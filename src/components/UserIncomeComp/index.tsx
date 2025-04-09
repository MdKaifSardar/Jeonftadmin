"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
  calculateMLMLevelIncome,
  calculateReferralIncome,
  getUserDetails,
  updateUserBalance,
} from "@/lib/actions/user.actions";
import { toast } from "react-toastify";

interface UserIncome {
  roiIncome: number;
  levelIncome: number;
  referralIncome: number;
  referralIncomeAmount: number;
  incomeAmount: number;
  balance: number;
  totalBalance: number;
}

const UserIncomeComp = () => {
  const [income, setIncome] = useState<UserIncome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in.");

        const userResult = await getUserDetails(userId);
        if (!userResult.success)
          throw new Error(userResult.error || "Failed to fetch user details.");

        // Compute incomes as percentages for ROI and Level; referralIncome is computed internally
        const roiIncome = 1.5; // Fixed ROI income as 1.5%
        const levelIncome = await calculateMLMLevelIncome(userId); // returns 8, 5, or 2
        const referralIncome = await calculateReferralIncome(userId);

        const balanceResult = await updateUserBalance(
          userId,
          roiIncome,
          levelIncome,
          referralIncome
        );
        if (!balanceResult.success)
          throw new Error(balanceResult.message || "Failed to update balance.");

        const incomeData: UserIncome = {
          roiIncome,
          levelIncome,
          referralIncome,
          referralIncomeAmount: balanceResult.referralIncome || 0,
          incomeAmount: balanceResult.totalIncome || 0,
          balance: balanceResult.balance || 0,
          totalBalance: balanceResult.totalBalance || 0,
        };

        setIncome(incomeData);
      } catch (err: any) {
        console.error("Error in UserIncomeComp:", err);
        setError(err.message || "Something went wrong.");
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  if (loading) return <Loader text="Loading income details..." />;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {error || !income ? (
        <p className="text-gray-600 text-center">
          {error || "No income details available. Please try reloading or contact support."}
        </p>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-4">Income Details</h2>
          <p className="mb-2">
            <span className="font-medium">ROI Income:</span>{" "}
            {income.roiIncome.toFixed(4)}%
          </p>
          <p className="mb-2">
            <span className="font-medium">Level Income:</span>{" "}
            {income.levelIncome.toFixed(4)}%
          </p>
          <p className="mb-2">
            <span className="font-medium">Referral Income:</span>{" "}
            {income.referralIncome.toFixed(4)}%
          </p>
          <p className="mb-2">
            <span className="font-medium">Balance:</span>{" "}
            {income.balance.toFixed(4)} ETH
          </p>
          <p className="mb-2">
            <span className="font-medium">Total Balance:</span>{" "}
            {income.totalBalance.toFixed(4)} ETH
          </p>
          <p>
            <span className="font-medium">Total Income:</span>{" "}
            {(income.incomeAmount + income.referralIncomeAmount).toFixed(4)} ETH
          </p>
        </>
      )}
    </div>
  );
};

export default UserIncomeComp;
