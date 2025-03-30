import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  referralCode?: string; // Optional field
  userReferralCode: string; // Unique referral code for the user
  walletId?: mongoose.Types.ObjectId; // Optional field to link to a wallet
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  referralCode: { type: String },
  userReferralCode: { type: String, required: true, unique: true },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
});

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
