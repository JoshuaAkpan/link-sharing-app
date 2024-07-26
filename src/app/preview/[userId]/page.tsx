"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getLinks } from "../../../lib/links";
import { getProfile } from "../../../lib/profile";
import { getLinkColor } from "../../../lib/utils";
import { Link, Profile } from "../../../types";
import PreLoader from "../../../components/PreLoader";
import toast from "react-hot-toast";
import CustomToast from "../../../components/CustomToast";
import Image from "next/image";
import { getIcon } from "@/lib/utils";

export default function Preview() {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      if (userId) {
        const userLinks = await getLinks(userId);
        const userProfile = await getProfile(userId);
        setLinks(userLinks);
        setProfile(userProfile);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/preview/${userId}`;
    navigator.clipboard.writeText(url);
    toast.custom(
      <CustomToast
        icon={
          <Image
            src="/image/linkIcon.svg"
            alt="linkicon"
            width={20}
            height={20}
          />
        }
        text="The link has been copied to your clipboard!"
      />
    );
  };

  if (!profile) {
    return (
      <div>
        <PreLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] md:bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="hidden md:block absolute top-0 w-full h-[357px] bg-[#633CFF] rounded-b-[32px] z-0"></div>

      <header className="container w-full h-[78px] px-4 py-4 flex justify-between items-center rounded-[12px] mb-[126px] z-10 bg-[#FFFFFF]">
        <a onClick={() => router.push("/dashboard/links")}>
          <span className="bg-white cursor-pointer text-purple-600 border border-purple-600 px-4 py-2 rounded-md hover:bg-purple-100">
            Back to Editor
          </span>
        </a>

        <a onClick={handleCopyLink}>
          <span className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Share Link
          </span>
        </a>
      </header>

      <div className="w-[349px] p-[56px] rounded-[24px] md:shadow-card bg-white z-10">
        <div className="flex flex-col justify-center items-center   max-w-md w-full sm:mx-2">
          <img
            src={profile.imageUrl || "https://via.placeholder.com/150"}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-[104px] h-[104px] rounded-full border-[4px] border-[#633CFF] mx-auto mb-4 mt-[16px]"
          />

          <h1 className="text-2xl font-bold text-center mb-2">{`${profile.firstName} ${profile.lastName}`}</h1>
          <p className="text-gray-600 text-center mb-6">{profile.email}</p>

          {links.length == 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full animate-pulse">
              <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-full h-[44px]"></div>
              <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-full h-[44px]"></div>
              <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-full h-[44px]"></div>
              <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-full h-[44px]"></div>
            </div>
          ) : (
            links.map((link) => {
              const linkClasses = `flex items-center justify-between text-center py-3 px-[16px] rounded-md mb-3 w-full h-[44px] relative ${getLinkColor(
                link.platform
              )} hover:opacity-90 transition-opacity`;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  <div className="flex">
                    <Image
                      alt={link.platform}
                      src={`${getIcon(link.platform)}`}
                      width={16}
                      height={16}
                      className="mr-[8px]"
                    />
                    {`${link.platform
                      .charAt(0)
                      .toUpperCase()}${link.platform.slice(1)}`}
                  </div>

                  <Image
                    alt={link.platform}
                    src="/images/arrowRight.svg"
                    width={16}
                    height={16}
                    className="mr-[8px]"
                  />
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
