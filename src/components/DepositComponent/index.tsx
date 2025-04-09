"use client";

declare global {
  interface Window {
    ethereum: any;
  }
}

import { useState, useEffect } from "react";
import { createDeposit } from "@/lib/actions/deposit.actions";
import { getUserDetails, convertEthToRs } from "@/lib/actions/user.actions";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { getFirstAdminWallet } from "@/lib/actions/adminwallet.actions";

const NETWORK = {
  chainId: "0x1",
  name: "Ethereum Mainnet",
  symbol: "ETH",
};

const DepositComponent = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminWalletAddress, setAdminWalletAddress] = useState<string | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAdminWallet = async () => {
      try {
        const result = await getFirstAdminWallet();
        const walletData = Array.isArray(result.data) ? result.data[0] : result.data;
        if (result.success && walletData?.walletAddress) {
          setAdminWalletAddress(walletData.walletAddress);
        } else {
          toast.error(result.message || "Failed to fetch admin wallet address");
        }
      } catch (error) {
        console.error("Error fetching admin wallet address:", error);
        toast.error("Error fetching admin wallet address");
      }
    };

    fetchAdminWallet();
  }, []);

  const fetchUserBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInWei = BigInt(balance).toString(10);
      const balanceInEth = (Number(balanceInWei) / 1e18).toFixed(4);
      setUserBalance(balanceInEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch wallet balance");
    }
  };

  useEffect(() => {
    const initializeBalance = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const userResponse = await getUserDetails(userId);
        if (userResponse.success && userResponse.user.walletAddress) {
          await fetchUserBalance(userResponse.user.walletAddress);
        }
      }
    };
    initializeBalance();
  }, []);

  const handleAmountChange = async (value: string) => {
    setAmount(value);
    if (value && parseFloat(value) > 0) {
      try {
        const converted = await convertEthToRs(parseFloat(value));
        setConvertedAmount(converted);
      } catch (error) {
        console.error("Error converting ETH to INR:", error);
        setConvertedAmount(null);
      }
    } else {
      setConvertedAmount(null);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for MetaMask
      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask to make deposits");
      }

      // Check admin wallet address
      if (!adminWalletAddress) {
        throw new Error("Admin wallet address not configured");
      }

      // Check user login
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Please login to make a deposit");
      }

      // Validate amount
      if (!amount || parseFloat(amount) < 0.01) {
        throw new Error("Please enter a valid amount (minimum 0.01 ETH)");
      }

      // Check wallet connection
      const userResponse = await getUserDetails(userId);
      if (!userResponse.success || !userResponse.user.walletAddress) {
        throw new Error("Please connect your wallet first");
      }

      // Check network
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== NETWORK.chainId) {
        throw new Error(`Please switch to ${NETWORK.name} to make deposits`);
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Validate amount against balance
      if (!userBalance || parseFloat(amount) > parseFloat(userBalance)) {
        throw new Error(
          `Insufficient balance. Your balance: ${userBalance} ETH`
        );
      }

      toast.info("Please confirm the transaction in your wallet...");

      // Prepare transaction
      const transactionParameters = {
        from: userResponse.user.walletAddress,
        to: adminWalletAddress, // Use fetched admin wallet address
        value: "0x" + (parseFloat(amount) * 1e18).toString(16),
        gas: "0x5208", // 21000 gas
      };

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      toast.info("Transaction submitted, waiting for confirmation...");

      // Wait for transaction confirmation
      const receipt = await waitForTransaction(txHash);

      if (!receipt) {
        throw new Error("Transaction failed - no receipt received");
      }

      if (!receipt.status) {
        throw new Error("Transaction failed - check your wallet for details");
      }

      // Create deposit record with unit as 'eth'
      const depositResponse = await createDeposit(userId, parseFloat(amount), "eth");
      if (!depositResponse.success) {
        throw new Error(
          "Transaction successful but failed to record deposit. Please contact support."
        );
      }

      toast.success("Deposit successful! Funds will be locked for 180 days.");
      setAmount("");
      setShowWarning(false);
    } catch (error: any) {
      console.error("Deposit error:", error);
      let errorMessage = "Failed to process deposit";

      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (error.code === -32603) {
        errorMessage =
          "Internal JSON-RPC error. Please check your wallet balance and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  interface TransactionReceipt {
    status: boolean;
    [key: string]: any;
  }

  // Helper function to wait for transaction confirmation
  const waitForTransaction = async (
    txHash: string
  ): Promise<TransactionReceipt> => {
    return new Promise((resolve, reject) => {
      const checkTransaction = async () => {
        try {
          const receipt = (await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          })) as TransactionReceipt;
          if (receipt) {
            resolve(receipt);
          } else {
            setTimeout(checkTransaction, 1000); // Check again in 1 second
          }
        } catch (err) {
          reject(err);
        }
      };
      checkTransaction();
    });
  };

  if (isLoading) {
    return <Loader text="Processing deposit..." />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">Make a Deposit</h2>

      {/* Add wallet balance display */}
      <div className="mb-6">
        <div className="p-3 rounded-lg border border-gray-200">
          <div className="font-medium text-sm">
            Admin Wallet Address:
            <span className="block text-gray-700 break-all">
              {adminWalletAddress || "Loading..."}
            </span>
          </div>
          <div className="font-medium text-sm mt-4">
            Current Network: {NETWORK.name}
          </div>
          <div className="text-xs text-gray-500">({NETWORK.symbol})</div>
          <div className="mt-2 text-sm text-gray-700">
            Available Balance: {userBalance ? `${userBalance} ETH` : "Loading..."}
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-yellow-800 font-semibold mb-2">
          Important Notice:
        </h3>
        <p className="text-sm text-yellow-700">
          • Deposits are locked for a minimum period of 180 days
          <br />
          • Early withdrawal is not possible under any circumstances
          <br />• After 180 days, you can withdraw your funds with accumulated
          rewards
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Benefits:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Earn up to 12% APY on your deposits</li>
          <li>Automatic reward distribution</li>
          <li>No maintenance fees</li>
        </ul>
      </div>

      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              step="0.001"
              min="0.01"
              max={userBalance || undefined}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <div className="mt-1 text-sm text-gray-500">
              <div>Minimum deposit: 0.01 ETH</div>
              {convertedAmount !== null && (
                <div className="text-gray-700">
                  Equivalent in INR: ₹{convertedAmount.toFixed(2)}
                </div>
              )}
              {userBalance && parseFloat(amount) > parseFloat(userBalance) && (
                <div className="text-red-500">
                  Amount exceeds available balance
                </div>
              )}
            </div>
          </div>
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

export default DepositComponent;
