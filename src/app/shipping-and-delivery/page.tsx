import React from "react";

const ShippingAndDeliveryPage = () => {
  return (
    <div className="mt-[6rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Shipping and Delivery
      </h1>
      <p className="text-gray-700 mb-4">
        At JEO NFT, we ensure timely delivery of your digital assets. Please
        review our shipping and delivery policy below.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Delivery of NFTs
      </h2>
      <p className="text-gray-700 mb-6">
        NFTs purchased on our platform will be delivered to your connected
        wallet immediately upon successful payment.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Issues with Delivery
      </h2>
      <p className="text-gray-700 mb-6">
        If you experience any issues with the delivery of your NFTs, please
        contact our support team for assistance.
      </p>
    </div>
  );
};

export default ShippingAndDeliveryPage;
