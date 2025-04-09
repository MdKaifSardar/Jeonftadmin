import React from "react";

const CancellationAndRefundPage = () => {
  return (
    <div className="mt-[6rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Cancellation and Refund Policy
      </h1>
      <p className="text-gray-700 mb-4">
        At JEO NFT, we strive to provide the best service. Please review our
        cancellation and refund policy below.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Cancellation Policy
      </h2>
      <p className="text-gray-700 mb-6">
        Once a transaction is completed, it cannot be canceled. Please ensure
        all details are correct before proceeding with a transaction.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Refund Policy
      </h2>
      <p className="text-gray-700 mb-6">
        Refunds are not applicable for completed transactions. If you encounter
        any issues, please contact our support team for assistance.
      </p>
    </div>
  );
};

export default CancellationAndRefundPage;
