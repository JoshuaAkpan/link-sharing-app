"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "../lib/firebaseConfig";
import Image from "next/image";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white rounded-[12px] mx-[24px] mt-[24px]">
      <div className="container h-[78px] mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image alt='devLinks' src='/images/logo.svg' width={146} height={32} />
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
          {userId && (
            <Link href={`/preview/${userId}`}>
              <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md justify-end">
                Preview
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
