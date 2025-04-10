"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useState, useEffect } from "react";
import { createDeposit } from "@/lib/actions/deposit.actions";
import { getUserDetails } from "@/lib/actions/user.actions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const PaymentGatewayComp = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the Razorpay SDK
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setIsRazorpayLoaded(true);
        toast.success("Razorpay SDK loaded successfully.");
      };
      script.onerror = () => toast.error("Failed to load Razorpay SDK.");
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setIsRazorpayLoaded(true);
    }
  }, []);

  const handlePayment = async () => {
    try {
      if (!isRazorpayLoaded) {
        throw new Error("Razorpay SDK is not loaded. Please try again later.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100, // Convert to paise
        currency: "INR",
        name: "JEO NFT",
        description: "Deposit Payment",
        image:
          "https://res.cloudinary.com/dlly7wr0a/image/upload/v1744097716/jeonft_logo_new_zgpy5x.jpg",
        handler: async (response: any) => {
          if (response.razorpay_payment_id) {
            toast.success("Payment successful!");
            return true;
          } else {
            throw new Error("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return new Promise((resolve, reject) => {
        razorpay.on("payment.success", (response: any) => {
          resolve(response);
        });
        razorpay.on("payment.error", (response: any) => {
          toast.error(response.error.description || "Payment failed.");
          // Do not stop the process here; let the user retry or cancel explicitly
        });
        razorpay.on("payment.cancel", () => {
          toast.info("Payment was canceled by the user.");
          setIsLoading(false); // Stop the loader when the user cancels
          reject(new Error("Payment was canceled by the user."));
        });
      });
    } catch (error: any) {
      toast.error(error.message || "Payment failed.");
      setIsLoading(false); // Ensure the loader stops on error
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

      // Handle payment
      const paymentSuccess = await handlePayment();
      if (!paymentSuccess) {
        throw new Error(
          "Payment was not successful. Deposit creation aborted."
        );
      }

      // Create deposit record with unit as 'rs'
      const depositResponse = await createDeposit(
        userId,
        parseFloat(amount),
        "rs"
      );
      if (!depositResponse.success) {
        throw new Error("Failed to record deposit. Please contact support.");
      }

      toast.success("Deposit successful! Funds will be locked for 180 days.");
      setAmount("");
      setShowWarning(false);
    } catch (error: any) {
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
