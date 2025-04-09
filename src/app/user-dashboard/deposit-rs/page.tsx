import PaymentGatewayComp from "@/components/PaymentGatewayComp";
import { ToastContainer } from "react-toastify";

const DepositRsPage = () => {
  return (
    <div className="mt-[6rem]">
      <ToastContainer />
      <PaymentGatewayComp />
    </div>
  );
};

export default DepositRsPage;
