"use client";
import { ToastContainer } from "react-toastify";
import DepositComponent from "@/components/DepositComponent";
import "react-toastify/dist/ReactToastify.css";

const DepositNFT = () => {
  return (
    <div className="mt-[6rem] w-full flex flex-col justify-center items-center">
      <ToastContainer />
      <DepositComponent />
    </div>
  );
};

export default DepositNFT;
