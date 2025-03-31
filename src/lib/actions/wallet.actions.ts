"use server";

import Wallet from "@/lib/models/walletModel";
import mongoose from "mongoose";

export const createWallet = async (
  userId: string,
  address: string,
  balance: number,
  network: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const existingWallet = await Wallet.findOne({ address });
    if (existingWallet) {
      return { success: true, wallet: existingWallet }; // Return the existing wallet
    }

    const wallet = new Wallet({
      userId,
      address,
      balance,
      network,
    });

    await wallet.save();
    return { success: true, wallet };
  } catch (error: any) {
    console.error("Error creating wallet:", error.message);
    return { success: false, error: error.message };
  }
};
