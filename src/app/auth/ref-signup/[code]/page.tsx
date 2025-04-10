import React from "react";
import RefLogin from "@/components/RefSignup";
import { ToastContainer } from "react-toastify";

export default async function RefLoginPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <RefLogin referralCode={code} />
    </div>
  );
}
