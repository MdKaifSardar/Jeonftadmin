import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="mt-[6rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Terms and Conditions
      </h1>
      <p className="text-gray-700 mb-4">
        Welcome to JEO NFT. By using our platform, you agree to the following
        terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Use of the Platform
      </h2>
      <p className="text-gray-700 mb-6">
        You agree to use the platform only for lawful purposes and in
        compliance with all applicable laws and regulations.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Account Responsibility
      </h2>
      <p className="text-gray-700 mb-6">
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Limitation of Liability
      </h2>
      <p className="text-gray-700 mb-6">
        JEO NFT is not liable for any damages or losses resulting from your use
        of the platform.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Changes to Terms
      </h2>
      <p className="text-gray-700 mb-6">
        We reserve the right to update these terms at any time. Continued use
        of the platform constitutes acceptance of the updated terms.
      </p>
    </div>
  );
};

export default TermsAndConditionsPage;
