"use server";

import User from "@/lib/models/userModel";
import { connectToDatabase } from "@/lib/database/db";

interface UserNode {
  username: string;
  userReferralCode: string;
  referralCode?: string;
  children: UserNode[];
}

export const fetchMLMTree = async (): Promise<UserNode[]> => {
  try {
    await connectToDatabase();

    console.log("Fetching users from the database..."); // Debugging log
    const users = await User.find({});
    console.log("Fetched users:", users); // Debugging log

    const userMap: Record<string, UserNode> = {};

    // Create a map of all users
    users.forEach((user: any) => {
      userMap[user.userReferralCode] = {
        username: user.username,
        userReferralCode: user.userReferralCode,
        referralCode: user.referralCode,
        children: [],
      };
    });

    console.log("User map created:", userMap); // Debugging log

    // Build the tree structure
    const roots: UserNode[] = [];
    users.forEach((user: any) => {
      if (user.referralCode && userMap[user.referralCode]) {
        userMap[user.referralCode].children.push(userMap[user.userReferralCode]);
      } else {
        roots.push(userMap[user.userReferralCode]);
      }
    });

    console.log("Tree roots:", roots); // Debugging log
    return roots;
  } catch (error) {
    console.error("Error fetching MLM tree:", error); // Debugging log
    throw new Error("Failed to fetch MLM tree");
  }
};
