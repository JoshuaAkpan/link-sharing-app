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
      <div className="container h-[78px] mx-auto px-4 py-4 flex justify-between items-center sm:bg-white">
        <div>
          {/* md logo  */}
          <Link href="/" className="hidden sm:flex">
            <Image
              alt="devLinks"
              src="/images/logo.svg"
              width={146}
              height={32}
            />
          </Link>

          {/* sm logo  */}
          <Link href="/" className="flex sm:hidden">
            <Image
              alt="devLinks"
              src="/images/devlinkIcon.svg"
              width={32}
              height={32}
            />
          </Link>
        </div>



        <div className="flex space-x-4 w-fit items-center justify-between">
          <div className="flex justify-center items-center">
            <div>
              {/* md link  */}
              <Link href="/dashboard/links" className="hidden sm:flex">
                <span
                  className={`${
                    pathname === "/dashboard/links"
                      ? "text-[#633CFF] bg-[#EFEBFF] "
                      : "text-[#888888]"
                  } flex rounded-[8px] px-[27px] py-[11px]`}
                >
                  <Image
                    alt="devLinks"
                    src="/images/linkIcon.svg"
                    width={28}
                    height={28}
                    className={`${pathname === "/dashboard/links"? '': 'svg-filter'} pr-[8px]`}
                  />

                  Links
                </span>
              </Link>

              {/* sm link  */}
              <Link href="/dashboard/links" className="flex sm:hidden">
                <span
                  className={`${
                    pathname === "/dashboard/links"
                      ? "bg-[#EFEBFF]"
                      : "svg-filter "
                  }  rounded-[8px] px-[27px] py-[11px] `}
                >
                  <Image
                    alt="devLinks"
                    src="/images/linkIcon.svg"
                    width={20}
                    height={20}
                    className="flex sm:hidden"
                  />
                </span>
              </Link>
            </div>



            <div>
              {/* md profile  */}
              <Link href="/dashboard/profile" className="hidden sm:flex">
                <span
                  className={`${
                    pathname === "/dashboard/profile"
                      ? "text-[#633CFF]  bg-[#EFEBFF]"
                      : "text-[#888888]"
                  } flex rounded-[8px] px-[27px] py-[11px]`}
                >
                  <Image
                    alt="devLinks"
                    src="/images/ph_user-circle-bold.svg"
                    width={28}
                    height={28}
                    className={`${pathname === "/dashboard/profile"? '': 'svg-filter'} pr-[8px]`}
                  />

                  Profile Details
                </span>
              </Link>

              {/* sm profile  */}
              <Link href="/dashboard/profile" className="flex sm:hidden">
                <span
                  className={`${
                    pathname === "/dashboard/profile"
                      ? " bg-[#EFEBFF]"
                      : "svg-filter"
                  } rounded-[8px] px-[27px] py-[11px]`}
                >
                  <Image
                    alt="devLinks"
                    src="/images/ph_user-circle-bold.svg"
                    width={20}
                    height={20}
                    className="flex sm:hidden"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>


          {userId && (
            <div>
              {/* md preview  */}
              <Link href={`/preview/${userId}`} className="hidden sm:flex">
                <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md justify-end hover:bg-[#EFEBFF]">
                  Preview
                </span>
              </Link>

              {/* sm preview  */}
              <Link href={`/preview/${userId}`} className="flex sm:hidden">
                <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md justify-end hover:bg-[#EFEBFF]">
                  <Image
                    alt="devLinks"
                    src="/images/ph-eye.svg"
                    width={20}
                    height={20}
                    className="flex sm:hidden"
                  />
                </span>
              </Link>
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;
