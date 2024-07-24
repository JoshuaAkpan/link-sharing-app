"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import LinkItem from "../../../components/LinkItem";
import Button from "../../../components/Button";
import { getLinks, addLink, updateLink, deleteLink } from "../../../lib/links";
import { Link } from "../../../types";
import { auth } from "../../../lib/firebaseConfig";
import { getLinkColor } from "../../../lib/utils";

export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAddLink = async () => {
    if (auth.currentUser) {
      const newLink = {
        platform: "Github",
        url: "",
      };
      const linkId = await addLink(auth.currentUser.uid, newLink);
      setLinks([...links, { ...newLink, id: linkId }]);
    }
  };

  const handleUpdateLink = async (id: string, updates: Partial<Link>) => {
    await updateLink(id, updates);
    setLinks(
      links.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] flex flex-col items-center justify-center">
      <div className="w-full">
        <Header />
      </div>

      <main className="flex w-full max-w-[1440px] p-[24px] gap-[24px] ">
        <div className="hidden md:flex md:flex-1 bg-white rounded-[12px] items-center justify-center p-6">
          <div className="relative w-[307px] h-[631px] bg-[#633CFF] rounded-[12px]"></div>
          <div className="absolute">
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

        <div className="flex-1 bg-white rounded-[12px] p-[40px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-[32px] font-bold text-[#333333]">
              Customize your links
            </h2>
            <p className="text-[#737373] text-[16px]">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <Button
            onClick={handleAddLink}
            className="mb-6 border border-[#633CFF] rounded-[8px] text-[#633CFF] font-semibold px-[27px] py-[11px] hover:bg-[#EFEBFF]"
          >
            + Add new link
          </Button>

          <div className="flex flex-col gap-4 h-[500px]  overflow-y-auto custom-scrollbar">
            {links.map((link, index) => (
              <LinkItem
                key={link.id}
                link={link}
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
                count={index + 1}
              />
            ))}
          </div>

          <div className="bg-white p-4 border-t flex justify-end">
            <Button onClick={() => alert("Save clicked!")}>Save</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
