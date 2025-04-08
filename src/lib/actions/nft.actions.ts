"use server";

import cloudinary from "cloudinary";
import { connectToDatabase } from "../database/db";
import NFT, { INFT } from "../models/nftModel";
import mongoose from "mongoose";
import { getUserById } from "@/lib/actions/user.actions";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CreateNFTData {
  name: string;
  description: string;
  price: number;
  royalty: number;
  collectionName: string; // Mongoose ObjectId as a string
  image: File | null;
}

export const createNFT = async (nftData: CreateNFTData) => {
  try {
    await connectToDatabase();

    let image = { url: "", public_id: "" };

    // Upload image to Cloudinary if provided
    if (nftData.image) {
      const buffer = Buffer.from(await nftData.image.arrayBuffer());
      const uploadResult = await cloudinary.v2.uploader.upload(
        `data:${nftData.image.type};base64,${buffer.toString("base64")}`,
        { folder: "nft-images" }
      );
      image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    const nftObject: Partial<INFT> = {
      name: nftData.name,
      description: nftData.description,
      price: nftData.price,
      royalty: nftData.royalty,
      collectionName: new mongoose.Types.ObjectId(nftData.collectionName), // Convert string to ObjectId
      image,
    };

    // Save to MongoDB
    const nft = new NFT(nftObject);
    await nft.save();

    const plainNFT = JSON.parse(JSON.stringify(nft));
    return { success: true, data: plainNFT };
  } catch (error) {
    console.error("Error creating NFT:", error);
    return { success: false, error: "Failed to create NFT" };
  }
};

const convertNFTToPlainObject = (nft: any) => ({
  ...nft,
  _id: nft._id.toString(),
  collectionName: nft.collectionName.toString(),
  owner: nft.owner ? nft.owner.toString() : null, // Convert owner to string or null
});

export const getAllNFTs = async () => {
  try {
    await connectToDatabase();
    const nfts = await NFT.find({}).lean();
    const plainNFTs = nfts.map(convertNFTToPlainObject);
    return { success: true, data: plainNFTs };
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return { success: false, error: "Failed to fetch NFTs" };
  }
};

// Get NFT by ID
export const getNFTById = async (id: string) => {
  try {
    await connectToDatabase();
    const nft = await NFT.findById(id).lean();
    if (!nft) {
      return { success: false, error: "NFT not found" };
    }
    const plainNFT = convertNFTToPlainObject(nft);
    return { success: true, data: plainNFT };
  } catch (error) {
    console.error("Error fetching NFT:", error);
    return { success: false, error: "Failed to fetch NFT" };
  }
};

export const updateNFT = async (
  id: string,
  nftData: {
    name: string;
    description: string;
    price: number;
    royalty: number;
    collectionName: string; // Mongoose ObjectId as a string
    image?: File | null;
  }
) => {
  try {
    await connectToDatabase();

    const nft = await NFT.findById(id);
    if (!nft) {
      return { success: false, error: "NFT not found" };
    }

    let updatedImage = nft.image;

    // If a new image is provided, upload it and delete the old one
    if (nftData.image) {
      const buffer = Buffer.from(await nftData.image.arrayBuffer());
      const uploadResult = await cloudinary.v2.uploader.upload(
        `data:${nftData.image.type};base64,${buffer.toString("base64")}`,
        { folder: "nft-images" }
      );

      // Delete the old image from Cloudinary
      if (nft.image && nft.image.public_id) {
        await cloudinary.v2.uploader.destroy(nft.image.public_id);
      }

      updatedImage = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // Update the NFT
    const updatedNFT = await NFT.findByIdAndUpdate(
      id,
      {
        ...nftData,
        image: updatedImage,
      },
      { new: true }
    );

    const plainNFT = updatedNFT
      ? JSON.parse(JSON.stringify(updatedNFT))
      : null;
    return { success: true, data: plainNFT };
  } catch (error) {
    console.error("Error updating NFT:", error);
    return { success: false, error: "Failed to update NFT" };
  }
};

// Delete NFT
export const deleteNFT = async (id: string) => {
  try {
    await connectToDatabase();

    const nft = await NFT.findByIdAndDelete(id);
    if (!nft) {
      return { success: false, error: "NFT not found" };
    }

    // Delete image from Cloudinary
    if (nft.image && nft.image.public_id) {
      await cloudinary.v2.uploader.destroy(nft.image.public_id);
    }

    const plainNFT = JSON.parse(JSON.stringify(nft));
    return { success: true, data: plainNFT };
  } catch (error) {
    console.error("Error deleting NFT:", error);
    return { success: false, error: "Failed to delete NFT" };
  }
};

export const getNFTsByCollection = async (collectionId: string) => {
  try {
    await connectToDatabase();
    const nfts = await NFT.find({
      collectionName: new mongoose.Types.ObjectId(collectionId),
    }).lean();
    const plainNFTs = nfts.map(convertNFTToPlainObject);
    return { success: true, data: plainNFTs };
  } catch (error) {
    console.error("Error fetching NFTs by collection:", error);
    return { success: false, error: "Failed to fetch NFTs for the collection" };
  }
};

export const buyNFT = async (nftId: string, userId: string) => {
  try {
    await connectToDatabase();

    // Fetch the NFT without using .lean() to allow save()
    const nft = await NFT.findById(nftId) as mongoose.Document & INFT;
    if (!nft) {
      return { success: false, error: "NFT not found." };
    }
    if (nft.owner) {
      return { success: false, error: "NFT already sold." };
    }

    // Fetch the user and ensure sufficient balance exists
    const userResult = await getUserById(userId);
    if (!userResult.success || !userResult.data) {
      return { success: false, error: "User not found." };
    }
    const user = userResult.data;
    if (!user.totalBalance || user.totalBalance < nft.price) {
      return { success: false, error: "Insufficient balance." };
    }

    // Deduct the NFT price from the user's totalBalance
    const balanceUpdateResult = await updateUserBalanceByPurchase(userId, nft.price);
    if (!balanceUpdateResult.success) {
      return {
        success: false,
        error: balanceUpdateResult.error || "Failed to update user's balance.",
      };
    }

    // Mark NFT as sold by setting its owner field and save the document
    nft.owner = new mongoose.Types.ObjectId(userId);
    await nft.save();

    const plainNFT = JSON.parse(JSON.stringify(nft));
    return { success: true, data: { nftId: plainNFT._id } };
  } catch (error: any) {
    console.error("Error buying NFT:", error);
    return { success: false, error: error.message || "Failed to buy NFT." };
  }
};

export const getOwnedNFTs = async (userId: string) => {
  try {
    await connectToDatabase();
    // Validate that userId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { success: false, error: "Invalid user ID format." };
    }
    const nfts = await NFT.find({ owner: new mongoose.Types.ObjectId(userId) }).lean(); // Use .lean() to return plain objects
    const plainNFTs = nfts.map(convertNFTToPlainObject);
    return { success: true, data: plainNFTs }; // Ensure plain objects are returned
  } catch (error) {
    console.error("Error fetching owned NFTs:", error);
    return { success: false, error: "Failed to fetch owned NFTs" };
  }
};

async function updateUserBalanceByPurchase(
  userId: string,
  price: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectToDatabase();
    const updatedUser = await mongoose.connection
      .collection("users")
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $inc: { totalBalance: -price } },
        { returnDocument: "after" }
      );

    if (!updatedUser) {
      return { success: false, error: "Failed to update user balance" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user balance:", error);
    return { success: false, error: "Failed to update user balance" };
  }
}

export const searchNFTs = async (keyword: string) => {
  try {
    await connectToDatabase();

    // Perform a case-insensitive search on the name and description fields
    const nfts = await NFT.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).lean();
    const plainNFTs = nfts.map(convertNFTToPlainObject);
    return { success: true, data: plainNFTs };
  } catch (error) {
    console.error("Error searching NFTs:", error);
    return { success: false, error: "Failed to search NFTs" };
  }
};
