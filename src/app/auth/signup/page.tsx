import React from "react";
import SignUpComponent from "../_component/SignUpComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ToastContainer />
      <SignUpComponent />
    </div>
  );
};

export default page;
