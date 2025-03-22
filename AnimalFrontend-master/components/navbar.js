"use client";
import { useState, useEffect } from "react";
import { FaCog, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // window.location.reload();
  };

  return (
    <>
      <header className="flex justify-between fixed w-full items-center px-6 py-5 shadow-lg z-20 bg-[var(--backgroundColor)]">
        <div className="text-3xl md:text-4xl font-bold text-[var(--secondaryColor)]">
          <Link href="/">
            Paw<span className="text-[var(--primaryColor)]">Gle</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-grow max-w-xs space-x-3 mr-[100px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md bg-white text-[var(--secondaryColor)] focus:outline-none focus:ring-1 focus:ring-[var(--secondaryColor)] shadow-lg"
          />
        </div>

        {/* Profile & Theme Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--background2)] hover:bg-[var(--primaryColor)] transition duration-300"
          >
            {isDarkMode === false ? (
              <FaMoon className="text-[var(--textColor)]" size={20} />
            ) : (
              <FaSun className="text-[var(--textColor)]" size={20} />
            )}
          </button>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <Image
                src="/animal.png"
                width={100}
                height={100}
                alt="Profile"
                className="w-10 h-10 items-center rounded-full border-2 border-[var(--primaryColor)] bg-[var(--c2)]"
              />
            </button>
            {showDropdown && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-[var(--background2)] rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="py-2 text-[var(--secondaryColor)]">
                  <li className="px-4 py-2 hover:bg-[var(--backgroundColor)] flex items-center space-x-2">
                    <MdDashboard />
                    <Link href="/dashboard">
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-[var(--backgroundColor)] flex items-center space-x-2">
                    <FaUser />
                    <Link href="/user">
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-[var(--backgroundColor)] flex items-center space-x-2">
                    <FaCog />
                    <span>Settings</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[var(--backgroundColor)] flex items-center space-x-2"
                    onClick={logout}
                  >
                    <FiLogOut className="text-[22px]" />
                    {localStorage.getItem("accessToken") &&
                    localStorage.getItem("refreshToken") ? (
                      <Link href="/">
                        <span>LogOut</span>
                      </Link>
                    ) : (
                      <Link href="/login">
                        <span>Login</span>
                      </Link>
                    )}
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
