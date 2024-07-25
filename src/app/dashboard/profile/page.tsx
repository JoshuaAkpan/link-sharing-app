"use client";

import ProfileForm from "../../../components/ProfileForm";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebaseConfig";
import PreLoader from "../../../components/PreLoader";
import Header from "../../../components/Header";
import SkeletonLinks from "../../../components/SkeletonLinks";
import { getLinks } from "../../../lib/links";
import { Link } from "../../../types";
import Image from "next/image";
import PhoneMockup from "../../../components/PhoneMockup";

export default function Links() {
  const [userId, setUserId] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks);
        setUserId(user.uid);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!userId) {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] flex flex-col items-center justify-center">
      <div className="w-full">
        <Header />
      </div>

      <main className="flex justify-center box-border  w-full max-w-[1440px] p-[16px] md:p-[24px] gap-[24px] ">
        <div className="hidden lg:flex relative w-5/12 bg-[#FFFFFF]">
          <div className="absolute flex flex-col items-center justify-center w-full h-full">
            {links.length === 0 ? (
              <SkeletonLinks />
            ) : (
              <PhoneMockup links={links} />
            )}
          </div>
        </div>

        <div className="w-[808px] md:h-[850px] lg:h-[810px] bg-white rounded-[12px] p-[24px] md:pt-[40px] md:px-[40px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl mb-[8px] md:text-[32px] font-bold text-[#333333]">
              Profile Details
            </h2>
            <p className="text-[#737373] text-base">
              Add your details to create a personal touch to your profile.
            </p>
          </div>

          <div>
            <ProfileForm userId={userId} />
          </div>
        </div>
      </main>
    </div>
  );
}
