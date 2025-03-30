"use server";

import User from "@/lib/models/userModel";
import { verifyPassword } from "@/utils/bcrypt"; // Correct import for password verification
import { generateToken } from "@/utils/jwt";
import { connectToDatabase } from "@/lib/database/db";
import { setCookie } from "cookies-next";

export const login = async (email: string, password: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    // Verify the password using bcrypt
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password." };
    }

    const token = generateToken({ id: user._id, email: user.email });

    // Save the token to cookies using cookies-next
    setCookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return { success: true, message: "Login successful.", data: { user } };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "Failed to log in." };
  }
};
