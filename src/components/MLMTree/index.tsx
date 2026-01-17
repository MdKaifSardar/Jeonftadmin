"use client";

import React, { useEffect, useState } from "react";
import { fetchMLMTree } from "@/lib/actions/mlmtree.actions";

interface UserNode {
  username: string;
  userReferralCode: string;
  referralCode?: string;
  children: UserNode[];
}

const MLMTree: React.FC = () => {
  const [tree, setTree] = useState<UserNode[]>([]);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null); // Track the hovered user

  useEffect(() => {
    const loadTree = async () => {
      try {
        const treeData = await fetchMLMTree();
        setTree(treeData);
      } catch (error) {
        console.error("Error loading tree data:", error);
      }
    };
    loadTree();
  }, []);

  const renderTree = (node: UserNode) => (
    <li
      key={node.userReferralCode}
      className="ml-4 relative"
      onMouseEnter={() => setHoveredUser(node.userReferralCode)} // Set hovered user
      onMouseLeave={() => setHoveredUser(null)} // Clear hovered user
    >
      <div className="font-bold mb-[.5rem] bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
        {node.username}
      </div>
      {/* Show details box */}
      {hoveredUser === node.userReferralCode && (
        <div className="absolute md:left-full md:top-0 md:ml-4 flex flex-col bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-64 md:w-64 md:mt-0 mt-2 z-50">
          <h3 className="text-lg font-bold mb-2">User Details</h3>
          <p>
            <span className="font-semibold">Username:</span> {node.username}
          </p>
          <p>
            <span className="font-semibold">Referral Code:</span>{" "}
            {node.userReferralCode}
          </p>
          {node.referralCode && (
            <p>
              <span className="font-semibold">Referred By:</span>{" "}
              {node.referralCode}
            </p>
          )}
        </div>
      )}
      {node.children.length > 0 && (
        <ul className="border-l-2 border-gray-300 pl-4 mt-2">
          {node.children.map((child) => renderTree(child))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-4 w-full h-full flex flex-col justify-center items-center rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        MLM Tree
      </h1>
      <ul className="list-none">{tree.map((root) => renderTree(root))}</ul>
    </div>
  );
};

export default MLMTree;
