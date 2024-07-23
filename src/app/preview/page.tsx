"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseConfig";
import { getLinks } from "../../lib/links";
import { getProfile } from "../../lib/profile";
import { Link, Profile } from "../../types";
import Button from "../../components/Button";

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
    alert("Link copied to clipboard!");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

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
            className="block bg-gray-100 text-center py-2 px-4 rounded mb-2 hover:bg-gray-200 transition-colors"
          >
            {link.platform}
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
