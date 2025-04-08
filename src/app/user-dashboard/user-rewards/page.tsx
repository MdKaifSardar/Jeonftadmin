import UserRewards from "@/components/FetchRewardComponent";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="w-full flex flex-col">
      <ToastContainer />
      <UserRewards />
    </div>
  );
};

export default page;
