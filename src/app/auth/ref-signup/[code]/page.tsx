import React from "react";
import { ToastContainer } from "react-toastify";
import RefSignup from "@/components/RefSignup";

export default async function RefLoginPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <RefSignup referralCode={code} />
    </div>
  );
}
