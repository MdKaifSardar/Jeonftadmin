import React from "react";

const ContactUsPage = () => {
  return (
    <div className="mt-[6rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-gray-700 mb-4">
        We are here to help! If you have any questions or concerns, please feel
        free to reach out to us.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Support Email
      </h2>
      <p className="text-gray-700 mb-6">
        You can email us at{" "}
        <span className="text-blue-900 font-semibold">support@jeonft.com</span>{" "}
        for any support-related queries.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Business Inquiries
      </h2>
      <p className="text-gray-700 mb-6">
        For business inquiries, please contact us at{" "}
        <span className="text-blue-900 font-semibold">business@jeonft.com</span>.
      </p>
    </div>
  );
};

export default ContactUsPage;
