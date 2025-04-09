"use client";

import { useState } from "react";
import { createDeposit } from "@/lib/actions/deposit.actions";
import { getUserDetails } from "@/lib/actions/user.actions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const PaymentGatewayComp = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const receiverUpiAddress = process.env.NEXT_PUBLIC_RECEIVER_UPI_ADDRESS || "";

  const handleGooglePayPayment = async () => {
    try {
      if (!receiverUpiAddress) {
        throw new Error("Receiver UPI address is not configured.");
      }

      if (!amount || parseFloat(amount) < 100) {
        throw new Error("Please enter a valid amount (minimum ₹100)");
      }

      // Redirect to Google Pay UPI payment URL
      const upiUrl = `upi://pay?pa=${receiverUpiAddress}&pn=Receiver&am=${amount}&cu=INR`;
      window.location.href = upiUrl;

      // Simulate payment verification (replace with server-side verification in production)
      const paymentSuccess = await new Promise((resolve) =>
        setTimeout(() => resolve(true), 5000) // Simulate a delay for payment verification
      );

      if (!paymentSuccess) {
        throw new Error("Google Pay payment failed. Please try again.");
      }

      toast.success("Google Pay payment successful!");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Google Pay payment failed.");
      return false;
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check user login
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Please login to make a deposit");
      }

      // Validate amount
      if (!amount || parseFloat(amount) < 100) {
        throw new Error("Please enter a valid amount (minimum ₹100)");
      }

      // Fetch user details
      const userResponse = await getUserDetails(userId);
      if (!userResponse.success) {
        throw new Error("Failed to fetch user details");
      }

      // Handle Google Pay payment
      const paymentSuccess = await handleGooglePayPayment();
      if (!paymentSuccess) {
        throw new Error("Payment was not successful. Deposit creation aborted.");
      }

      // Create deposit record with unit as 'rs'
      const depositResponse = await createDeposit(userId, parseFloat(amount), "rs");
      if (!depositResponse.success) {
        throw new Error("Failed to record deposit. Please contact support.");
      }

      toast.success("Deposit successful! Funds will be locked for 180 days.");
      setAmount("");
      setShowWarning(false);
    } catch (error: any) {
      console.error("Deposit error:", error);
      toast.error(error.message || "Failed to process deposit");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader text="Processing deposit..." />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">Make a Deposit (₹)</h2>

      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            step="1"
            min="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">
            Please use the following UPI address to complete your payment via Google Pay:
          </p>
          <p className="text-lg font-bold text-blue-900 mt-2">{receiverUpiAddress}</p>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            required
            onChange={(e) => setShowWarning(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I understand that my deposit will be locked for 180 days
          </label>
        </div>

        <button
          type="submit"
          disabled={!showWarning}
          className={`w-full py-3 px-6 text-center text-white font-medium rounded-lg ${
            showWarning
              ? "bg-blue-900 hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Deposit
        </button>
      </form>
    </div>
  );
};

export default PaymentGatewayComp;
