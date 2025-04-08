"use client";

import { useState, useEffect } from "react";
import { updateUserWallet, removeWallet } from "@/lib/actions/user.actions";
import { createWallet } from "@/lib/actions/wallet.actions";
import { getUserDetails } from "@/lib/actions/user.actions";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import { ETHEREUM_MAINNET, isEthereumMainnet } from "@/constants/networks";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<any>(null);

  const resetWalletState = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setHasWallet(false);
    setWalletBalance(null);
    setNetwork(null);
    if (window.ethereum) {
      window.ethereum.removeAllListeners("chainChanged");
      window.ethereum.removeAllListeners("accountsChanged");
    }
  };

  useEffect(() => {
    const initializeWallet = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUserDetails(userId);
        if (response.success) {
          setUserDetails(response.user);
          if (response.user.walletAddress) {
            setWalletAddress(response.user.walletAddress);
            setHasWallet(true);
            setIsConnected(true);
            await fetchWalletBalance(response.user.walletAddress);
            await fetchNetwork();
          }
        } else {
          toast.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();
  }, []);

  const fetchWalletBalance = async (address: string) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Only fetch balance if on Ethereum mainnet
        if (!isEthereumMainnet(chainId)) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ETHEREUM_MAINNET.chainId }],
          });
        }

        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        
        const balanceInWei = BigInt(balance).toString(10);
        const balanceInEth = (Number(balanceInWei) / 1e18).toFixed(4);
        setWalletBalance(balanceInEth);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    }
  };

  const getNetworkName = (chainId: string) => {
    // Mainnet chainId can come in different formats
    return chainId === "0x1" || chainId === "1" || chainId === "0x01"
      ? "Ethereum Mainnet"
      : "Unsupported Network";
  };

  const fetchNetwork = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkName = getNetworkName(chainId);
        setNetwork(networkName);
        return networkName;
      } catch (error) {
        console.error("Error fetching network:", error);
        return null;
      }
    }
  };

  const isMainnet = network === "Ethereum Mainnet";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", () => {
        fetchNetwork();
      });

      // Initial network check
      fetchNetwork();
    }
  }, []);

  const formatWalletData = (data: any) => {
    if (!data) return null;
    return {
      ...data,
      balance:
        typeof data.balance === "bigint"
          ? data.balance.toString()
          : data.balance,
      _id: data._id?.toString(),
      userId: data.userId?.toString(),
    };
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsLoading(true);
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Ensure we're on Ethereum mainnet
        if (!isEthereumMainnet(chainId)) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ETHEREUM_MAINNET.chainId }],
          });
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userId = localStorage.getItem("userId");
        const address = accounts[0].toLowerCase();

        if (!userId) {
          toast.error("User ID not found. Please log in again.");
          return;
        }

        await fetchWalletBalance(address);
        const currentNetwork = await fetchNetwork();

        if (currentNetwork !== "Ethereum Mainnet") {
          toast.error("Please switch to Ethereum Mainnet to connect wallet");
          return;
        }

        const balance = walletBalance ? parseFloat(walletBalance) : 0;
        const response = await createWallet(
          userId,
          address,
          balance,
          currentNetwork || "Unknown"
        );

        if (response.success && response.wallet) {
          const walletData = formatWalletData(response.wallet);
          const updateResponse = await updateUserWallet(
            userId,
            walletData._id,
            address
          );

          if (updateResponse.success) {
            setWalletAddress(walletData.address);
            setWalletBalance(walletData.balance.toString());
            setNetwork(walletData.network);
            setIsConnected(true);
            setHasWallet(true);
            setWalletData(walletData);
            setUserDetails(formatWalletData(updateResponse.user));
            toast.success(updateResponse.message);
          } else {
            toast.error(updateResponse.message);
          }
        } else {
          toast.error(response.error || "Failed to connect wallet");
        }
      } catch (error: any) {
        console.error("Error connecting wallet:", error);
        toast.error(error.message || "Failed to connect wallet");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("MetaMask is not installed");
    }
  };

  const disconnectWallet = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      // Simplified disconnect logic
      const response = await removeWallet(userId);
      if (response.success) {
        resetWalletState();
        setUserDetails(response.user);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error disconnecting wallet:", error);
      toast.error(error.message || "Failed to disconnect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        resetWalletState();
      });

      window.ethereum.on("chainChanged", () => {
        fetchNetwork();
      });

      return () => {
        if (window.ethereum) {
          window.ethereum.removeAllListeners("accountsChanged");
          window.ethereum.removeAllListeners("chainChanged");
        }
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className="mt-[6rem] p-8">
        <Loader
          text={hasWallet ? "Disconnecting wallet..." : "Connecting wallet..."}
        />
      </div>
    );
  }

  if (!localStorage.getItem("userId")) {
    return (
      <div className="mt-[6rem] p-8 text-center">
        <h1 className="text-2xl font-semibold mb-6">Wallet</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 mb-4">
            Please login to view wallet details
          </p>
          <Link
            href="/auth/login"
            className="inline-block py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900 hover:opacity-90"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[6rem] p-8 bg-white text-black mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Wallet</h1>

      {!hasWallet ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-700 mb-4">
            No wallet connected. Connect your MetaMask wallet to continue.
          </p>
          <button
            onClick={connectMetaMask}
            className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-blue-900 hover:opacity-90"
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <>
          {hasWallet && network !== "Ethereum Mainnet" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                Warning: You are not connected to Ethereum Mainnet. Some
                features may be limited or unavailable.
              </p>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Connected Wallet</h2>
            <div className="text-center">
              <p className="text-gray-700 mb-4">Wallet Address:</p>
              <div className="py-2 px-4 bg-gray-50 rounded border border-gray-200 text-gray-500 font-mono overflow-x-auto mb-4">
                {walletAddress}
              </div>
              <button
                onClick={disconnectWallet}
                className="w-full py-3 px-6 text-center text-white font-medium rounded-lg bg-red-600 hover:bg-red-700"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Wallet Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Network:</span>
                <span className="text-gray-700">
                  {walletData?.network || network || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Balance:</span>
                <span className="text-gray-700">
                  {walletData
                    ? `${walletData.balance} ETH`
                    : walletBalance
                    ? `${walletBalance} ETH`
                    : "Fetching..."}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
