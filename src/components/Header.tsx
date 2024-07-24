"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white rounded-[12px] mx-[24px] mt-[24px]">
      <div className="container h-[78px] mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-purple-600 font-bold text-xl">devlinks</span>
        </Link>
        <nav className="flex space-x-4 w-[52%] justify-between">

          <div className="flex gap-4">
            <Link href="/dashboard/links">
              <span
                className={`${
                  pathname === "/dashboard/links"
                    ? "text-[#633CFF] bg-[#EFEBFF] rounded-[8px] px-[27px] py-[11px]"
                    : "text-[#888888]"
                }`}
              >
                Links
              </span>
            </Link>
            <Link href="/dashboard/profile">
              <span
                className={`${
                  pathname === "/dashboard/profile"
                    ? "text-[#633CFF] bg-[#EFEBFF] rounded-[8px] px-[27px] py-[11px]"
                    : "text-[#888888]"
                }`}
              >
                Profile Details
              </span>
            </Link>
          </div>

          <Link href="/preview">
            <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md justify-end">
              Preview
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
