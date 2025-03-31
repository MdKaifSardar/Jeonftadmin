"use client";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

import { useState, useEffect } from "react";
import { updateUserWalletId } from "@/lib/actions/user.actions";
import { createWallet } from "@/lib/actions/wallet.actions";
import Loader from "@/components/Loader"; // Import the Loader component

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading

  const fetchWalletBalance = async (address: string) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        setWalletBalance((parseInt(balance, 16) / 1e18).toFixed(4)); // Convert balance from Wei to Ether
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    }
  };

  const fetchNetwork = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkName = getNetworkName(chainId);
        setNetwork(networkName);
      } catch (error) {
        console.error("Error fetching network:", error);
      }
    }
  };

  const switchNetwork = async (chainId: string) => {
    if (chainId !== "0x1") {
      alert("Only Ethereum Mainnet is supported.");
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
        fetchNetwork();
        if (walletAddress) {
          fetchWalletBalance(walletAddress);
        }
      } catch (error) {
        console.error("Error switching network:", error);
        alert("Failed to switch network. Please try again.");
      }
    }
  };

  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet";
      default:
        return "Unknown Network";
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            setIsConnected(true);
            fetchWalletBalance(address);
            fetchNetwork();
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsLoading(true); // Start loading
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userId = localStorage.getItem("userId"); // Get userId from localStorage
        const address = accounts[0];
        const balance = walletBalance ? parseFloat(walletBalance) : 0;

        await fetchWalletBalance(address);
        await fetchNetwork();

        if (userId) {
          const response = await createWallet(
            userId,
            address,
            balance,
            "Ethereum Mainnet"
          );

          if (response.success) {
            setWalletAddress(address);
            setIsConnected(true);
            alert(
              response.wallet
                ? "Wallet connected successfully!"
                : "Wallet connected and created successfully!"
            );
          } else {
            console.error("Error connecting wallet:", response.error);
            alert(`Failed to connect wallet: ${response.error}`);
          }
        } else {
          alert("User ID not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
        alert("Failed to connect MetaMask.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to connect your wallet."
      );
    }
  };

  const disconnectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      }
    } catch (error) {
      console.error("Error removing MetaMask permissions:", error);
    } finally {
      setWalletAddress(null);
      setWalletBalance(null);
      setNetwork(null);
      setIsConnected(false);
      localStorage.removeItem("walletAddress"); // Clear wallet address from localStorage if stored
    }
  };

  return (
    <div className="p-8 bg-white text-black mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Wallet</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Connect Your Wallet</h2>
        {isLoading ? (
          <Loader /> // Show loader while loading
        ) : walletAddress ? (
          <div className="text-center">
            <p className="text-gray-700 mb-4">Wallet Address:</p>
            <div className="py-2 px-4 bg-gray-50 rounded border border-gray-200 text-gray-500 font-mono overflow-x-auto">
              {walletAddress}
            </div>
          </div>
        ) : (
          <button
            onClick={connectMetaMask}
            className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900 hover:opacity-90"
          >
            Connect MetaMask
          </button>
        )}
      </div>

      {walletAddress && !isLoading && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Wallet Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="font-medium">Wallet Address:</span>
              <span className="text-gray-700">{walletAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Network:</span>
              <span className="text-gray-700">{network || "Fetching..."}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Balance:</span>
              <span className="text-gray-700">
                {walletBalance ? `${walletBalance} ETH` : "Fetching..."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
