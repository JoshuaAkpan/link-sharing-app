"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseConfig";
import { getLinks } from "../../lib/links";
import { getProfile } from "../../lib/profile";
import { Link, Profile } from "../../types";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";


export default function Preview() {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userLinks = await getLinks(user.uid);
        const userProfile = await getProfile(user.uid);
        setLinks(userLinks);
        setProfile(userProfile);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);
  

  const handleCopyLink = () => {
    const url = window.location.origin + "/preview";
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
            style={{ marginRight: '8px' }}
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
    return <div>Loading...</div>;
  }

  const getLinkColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return 'bg-[#1A1A1A] text-white';
      case 'youtube': return 'bg-[#EE3939] text-white';
      case 'linkedin': return 'bg-[#2D68FF] text-white';
      case 'twitter': return 'bg-[#43B7E9] text-white';
      case 'frontend mentor': return 'bg-[#FFFFFF] text-[#333333]';
      case 'facebook': return 'bg-[#2442AC] text-white';
      case 'twitch': return 'bg-[#EE3FC8] text-white';
      case 'dev.to': return 'bg-[#333333] text-white';
      case 'codewars': return 'bg-[#8A1A50] text-white';
      case 'freecodecamp': return 'bg-[#302267] text-white';
      case 'gitlab': return 'bg-[#EB4925] text-white';
      case 'hashnode': return 'bg-[#0330D1] text-white';
      case 'stack overflow': return 'bg-[#EC7100] text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
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
            className={`block text-center py-3 px-4 rounded-md mb-3 ${getLinkColor(link.platform)} hover:opacity-90 transition-opacity`}
          >
           {`${link.platform.charAt(0).toUpperCase()}${link.platform.slice(1)}`}
          </a>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={() => router.push("/dashboard/links")}>
          Back to Editor
        </Button>
        <Button onClick={handleCopyLink} className="ml-4">
          Share Link
        </Button>
      </div>
    </div>
  );
}
