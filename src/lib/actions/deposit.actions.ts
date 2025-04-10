"use server";

import { connectToDatabase } from "../database/db";
import Deposit from "../models/depositModel";
import { getUserDetails, convertRsToEth } from "./user.actions";
import mongoose from "mongoose";
import { getFirstAdminWallet } from "./adminwallet.actions";

export const createDeposit = async (userId: string, amount: number, unit: "eth" | "rs") => {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { success: false, message: "Invalid user ID" };
    }

    const userResponse = await getUserDetails(userId);
    if (!userResponse.success) {
      return { success: false, message: "User not found" };
    }

    if (!userResponse.user.walletId) {
      return { success: false, message: "No wallet connected" };
    }

    const adminWalletResponse = await getFirstAdminWallet();
    if (!adminWalletResponse.success || !Array.isArray(adminWalletResponse.data) || !adminWalletResponse.data[0]?.wallet) {
      return { success: false, message: "Admin wallet address not configured" };
    }

    // Convert amount to ETH if the unit is 'rs'
    let amountInEth = amount;
    if (unit === "rs") {
      amountInEth = await convertRsToEth(amount);
      if (!amountInEth || amountInEth <= 0) {
        return { success: false, message: "Failed to convert INR to ETH" };
      }
    }

    const deposit = new Deposit({
      amount: amountInEth,
      userId: new mongoose.Types.ObjectId(userId),
      walletId: userResponse.user.walletId,
      adminWalletAddress: adminWalletResponse.data[0].wallet,
      state: "pending",
      withdrawn: false,
      unit: "eth", // Always store the unit as 'eth' after conversion
    }) as any;

    await deposit.save();

    return {
      success: true,
      message: "Deposit initiated successfully",
      data: {
        depositId: deposit._id.toString(),
        amount: amountInEth,
        adminWalletAddress: adminWalletResponse.data[0].wallet,
      },
    };
  } catch (error: any) {
    console.error("Error creating deposit:", error);
    return { success: false, message: error.message };
  }
};

export const getDeposits = async (userId: string) => {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { success: false, message: "Invalid user ID format." };
    }

    const deposits = await Deposit.find({ userId: userId })
      .sort({ createdAt: -1 })
      .lean(); // Use lean() to convert Mongoose Documents to plain objects

    const plainDeposits = deposits.map((deposit) => ({
      ...deposit,
      _id: deposit._id.toString(),
      userId: deposit.userId.toString(),
      walletId: deposit.walletId.toString(),
    }));

    return {
      success: true,
      message: "Deposits fetched successfully.",
      data: plainDeposits, // Ensure plain objects are returned
    };
  } catch (error: any) {
    console.error("Error fetching deposits:", error);
    return {
      success: false,
      message: "An error occurred while fetching deposits.",
      error: error.message || "Unknown error",
    };
  }
};
