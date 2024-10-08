import { Link, useLocation } from "@remix-run/react";
import React from "react";
import { FaHome, FaSearch, FaPlusCircle, FaBell, FaUser } from "react-icons/fa";

import {
  indexPath,
  searchPath,
  registerPath,
  noticePath,
  accountPath,
} from "~/utils/pathGenerator";

export const FloatingNav = (): React.ReactElement => {
  const location = useLocation();
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };
  const handleClick = (e: React.MouseEvent, path: string): void => {
    // 現在のページの場合はリンクを無効にする
    if (isActive(path)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
      <div className="flex justify-around py-2">
        <Link
          to={indexPath}
          className={`flex flex-col items-center p-2 ${
            isActive(indexPath) && "text-blue-600"
          }`}
          onClick={(e) => handleClick(e, indexPath)}
          aria-label="Index"
        >
          <FaHome size={24} />
        </Link>
        <Link
          to={searchPath}
          className={`flex flex-col items-center p-2 ${
            isActive(searchPath) && "text-blue-600"
          }`}
          onClick={(e) => handleClick(e, searchPath)}
          aria-label="Search"
        >
          <FaSearch size={24} />
        </Link>
        <Link
          to={registerPath}
          className={`flex flex-col items-center p-2 ${
            isActive(registerPath) && "text-blue-600"
          }`}
          onClick={(e) => handleClick(e, registerPath)}
          aria-label="Register"
        >
          <FaPlusCircle size={24} />
        </Link>
        <Link
          to={noticePath}
          className={`flex flex-col items-center p-2 ${
            isActive(noticePath) && "text-blue-600"
          }`}
          onClick={(e) => handleClick(e, noticePath)}
          aria-label="Notification"
        >
          <FaBell size={24} />
        </Link>
        <Link
          to={accountPath}
          className={`flex flex-col items-center p-2 ${
            isActive(accountPath) && "text-blue-600"
          }`}
          onClick={(e) => handleClick(e, accountPath)}
          aria-label="Account"
        >
          <FaUser size={24} />
        </Link>
      </div>
    </nav>
  );
};
