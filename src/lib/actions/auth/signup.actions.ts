"use server";

import User from "@/lib/models/userModel";
import { hashPassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwt";
import { connectToDatabase } from "@/lib/database/db";
import { generateReferralCode } from "@/utils/referral-code-gen";
import { setCookie } from "cookies-next";

export const signup = async (
  email: string,
  username: string,
  password: string,
  referralCode?: string
) => {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "User with this email already exists." };
    }

    const hashedPassword = await hashPassword(password);
    const userReferralCode = generateReferralCode();

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      referralCode,
      userReferralCode,
    });

    await newUser.save();

    const token = generateToken({ id: newUser._id, email: newUser.email });

    // Save the token to cookies using cookies-next
    setCookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return {
      success: true,
      message: "Signup successful.",
      data: { user: newUser },
    };
  } catch (error) {
    console.error("Error during signup:", error);
    return { success: false, error: "Failed to sign up." };
  }
};
