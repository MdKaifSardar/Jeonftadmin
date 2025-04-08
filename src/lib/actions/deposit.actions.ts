"use server";

import { connectToDatabase } from "../database/db";
import Deposit from "../models/depositModel";
import { getUserDetails } from "./user.actions";
import mongoose from "mongoose";

export const createDeposit = async (userId: string, amount: number) => {
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

    const deposit = new Deposit({
      amount,
      userId: new mongoose.Types.ObjectId(userId),
      walletId: userResponse.user.walletId,
      adminWalletAddress: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
      state: "pending",
    }) as any;

    await deposit.save();

    return {
      success: true,
      message: "Deposit initiated successfully",
      data: {
        depositId: deposit._id.toString(),
        amount,
        adminWalletAddress: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
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

    // Use lean() to convert Mongoose Documents to plain objects.
    const deposits = await Deposit.find({ userId: userId })
      .sort({ createdAt: -1 })
      .lean();

    // Optionally, convert any ObjectId fields to string if needed
    const plainDeposits = deposits.map((deposit) => ({
      ...deposit,
      _id: deposit._id.toString(),
      userId: deposit.userId.toString(),
      walletId: deposit.walletId.toString(),
    }));

    return {
      success: true,
      message: "Deposits fetched successfully.",
      data: plainDeposits,
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
