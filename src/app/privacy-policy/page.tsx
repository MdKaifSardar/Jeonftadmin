import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="mt-[6rem] p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Privacy and Policy
      </h1>
      <p className="text-gray-700 mb-4">
        Welcome to JEO NFT. Your privacy is important to us, and we are
        committed to protecting your personal information. This Privacy Policy
        outlines how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Information We Collect
      </h2>
      <p className="text-gray-700 mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Personal details such as your name, email address, and username.</li>
        <li>Payment information for deposits and transactions.</li>
        <li>Usage data, including your interactions with our platform.</li>
        <li>Wallet details for cryptocurrency transactions.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        How We Use Your Information
      </h2>
      <p className="text-gray-700 mb-4">
        The information we collect is used for the following purposes:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>To provide and improve our services.</li>
        <li>To process deposits, withdrawals, and transactions.</li>
        <li>To communicate with you regarding updates and promotions.</li>
        <li>To ensure the security of your account and transactions.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Data Security
      </h2>
      <p className="text-gray-700 mb-6">
        We implement industry-standard security measures to protect your data.
        However, no method of transmission over the internet or electronic
        storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Sharing Your Information
      </h2>
      <p className="text-gray-700 mb-6">
        We do not sell or share your personal information with third parties,
        except as required by law or to provide our services (e.g., payment
        processing).
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Your Rights
      </h2>
      <p className="text-gray-700 mb-6">
        You have the right to access, update, or delete your personal
        information. If you wish to exercise these rights, please contact our
        support team.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Changes to This Policy
      </h2>
      <p className="text-gray-700 mb-6">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and we encourage you to review it periodically.
      </p>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-700 mb-6">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at <span className="text-blue-900 font-semibold">support@jeonft.com</span>.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
