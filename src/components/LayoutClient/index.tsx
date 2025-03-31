"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyToken } from "@/utils/jwt";
import { usePathname } from "next/navigation";

const LayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await verifyToken(token); // Verify the token
          setIsAuthenticated(true); // Valid token
        } catch {
          setIsAuthenticated(false); // Invalid token
        }
      } else {
        setIsAuthenticated(false); // No token
      }
    };

    checkAuth();
  }, [pathname]); // Run checkAuth every time the pathname changes

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </>
  );
};

export default LayoutClient;
