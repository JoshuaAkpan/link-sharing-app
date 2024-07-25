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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px" }}
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M22 12v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9" />
          </svg>
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="container w-full h-[78px] px-4 py-4 flex justify-between items-center rounded-[12px] mb-[126px]">

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

      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <img
          src={profile.imageUrl || "https://via.placeholder.com/150"}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-center mb-2">{`${profile.firstName} ${profile.lastName}`}</h1>
        <p className="text-gray-600 text-center mb-6">{profile.email}</p>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-center py-3 px-4 rounded-md mb-3 ${getLinkColor(
              link.platform
            )} hover:opacity-90 transition-opacity`}
          >
            {`${link.platform.charAt(0).toUpperCase()}${link.platform.slice(
              1
            )}`}
          </a>
        ))}
      </div>
    </div>
  );
}
