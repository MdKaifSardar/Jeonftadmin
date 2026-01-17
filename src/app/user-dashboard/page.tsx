"use client";

import UserDashComp from "@/components/userDashComp";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <ToastContainer />
      <UserDashComp />
    </div>
  );
};

export default Dashboard;
