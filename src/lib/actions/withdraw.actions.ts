"use server";

import { connectToDatabase } from "../database/db";
import Withdraw, { IWithdraw } from "../models/withdrawModel";
import mongoose, { Document } from "mongoose";
import { getFirstAdminWallet } from "./adminwallet.actions";

export const createWithdraw = async (
  depositId: string,
  userId: string,
  walletId: string,
  amount: number
) => {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(depositId)) {
      return { success: false, message: "Invalid deposit ID." };
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { success: false, message: "Invalid user ID." };
    }
    if (!mongoose.Types.ObjectId.isValid(walletId)) {
      return { success: false, message: "Invalid wallet ID." };
    }

    const adminWalletResponse = await getFirstAdminWallet();
    const adminWallet = Array.isArray(adminWalletResponse.data) ? adminWalletResponse.data[0] : adminWalletResponse.data;
    if (!adminWalletResponse.success || !adminWallet?.walletAddress) {
      return { success: false, message: "Admin wallet address not configured" };
    }

    const existingWithdraw = await Withdraw.findOne({ depositId: depositId });
    if (existingWithdraw) {
      return { success: false, message: "Withdraw already exists for this deposit." };
    }

    const withdraw = new Withdraw({
      amount,
      userId: new mongoose.Types.ObjectId(userId),
      walletId: new mongoose.Types.ObjectId(walletId),
      adminWalletAddress: adminWallet.walletAddress, // Use fetched admin wallet address
      state: "pending",
      depositId: new mongoose.Types.ObjectId(depositId),
    }) as Document<unknown, object, IWithdraw> & IWithdraw & { _id: mongoose.Types.ObjectId };

    await withdraw.save();

    return {
      success: true,
      message: "Withdraw created successfully.",
      data: {
        withdrawId: withdraw._id.toString(),
      },
    };
  } catch (error: any) {
    console.error("Error creating withdraw:", error);
    return { success: false, message: error.message || "Error creating withdraw." };
  }
};

export const getWithdraws = async (userId: string) => {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { success: false, message: "Invalid user ID format." };
    }

    const withdraws = await Withdraw.find({ userId: userId })
      .sort({ createdAt: -1 })
      .lean();

    const plainWithdraws = withdraws.map((withdraw) => ({
      ...withdraw,
      _id: withdraw._id.toString(),
      userId: withdraw.userId.toString(),
      walletId: withdraw.walletId.toString(),
      depositId: withdraw.depositId.toString(),
    }));

    return {
      success: true,
      message: "Withdraws fetched successfully.",
      data: plainWithdraws,
    };
  } catch (error: any) {
    console.error("Error fetching withdraws:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching withdraws.",
    };
  }
};