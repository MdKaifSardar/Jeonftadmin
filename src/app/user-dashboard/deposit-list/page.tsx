import DepositList from "@/components/DepositListComp";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="mt-[6rem]">
      <ToastContainer/>
      <DepositList />
    </div>
  );
};

export default page;
