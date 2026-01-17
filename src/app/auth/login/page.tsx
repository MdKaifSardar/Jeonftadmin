import React from "react";
import LoginComponent from "../_component/LoginComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ToastContainer />
      <LoginComponent />
    </div>
  );
};

export default page;
