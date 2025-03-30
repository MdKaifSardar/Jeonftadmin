"use server";

import User from "@/lib/models/userModel";
import { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/database/db";
import { verifyToken } from "@/utils/jwt";
import { getCookie } from "cookies-next";

export const createUser = async (userData: Partial<IUser>) => {
  const { email, username, password, referralCode } = userData;

  if (!email || !username || !password) {
    throw new Error("Missing required fields: email, username, or password.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
    referralCode,
  });

  return await newUser.save();
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId).populate("walletId");
    if (!user) {
      return { success: false, error: "User not found." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user." };
  }
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }).populate("walletId");
};

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
) => {
  try {
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return { success: false, error: "User not found." };
    }
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user." };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return { success: false, error: "User not found." };
    }
    return { success: true, data: deletedUser };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user." };
  }
};

export const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

export const getUserFromToken = async (req: any) => {
  try {
    await connectToDatabase();

    const token = getCookie("token", { req });
    if (!token) {
      return { success: false, error: "No token found in cookies." };
    }

    const decoded: any = verifyToken(token as string);
    const user = await User.findById(decoded.id).populate("walletId");

    if (!user) {
      return { success: false, error: "User not found." };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user from token:", error);
    return { success: false, error: "Failed to fetch user from token." };
  }
};
