"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import LinkItem from "../../../components/LinkItem";
import Button from "../../../components/Button";
import SkeletonLinks from "../../../components/SkeletonLinks";
import { getLinks, addLink, updateLink, deleteLink } from "../../../lib/links";
import { Link } from "../../../types";
import { auth } from "../../../lib/firebaseConfig";
import Image from "next/image";
import PhoneMockup from "../../../components/PhoneMockup";
import toast from "react-hot-toast";
import CustomToast from "../../../components/CustomToast";

export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks);
      } else {
        router.push("/");
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

  const handleSave = () => {
    toast.custom(
      <CustomToast
        icon = {
          <Image src='/images/floppy-save.svg' alt='linkicon' width={20} height={20} />
        }
        text="Your links have been successfully saved!"
      />
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] flex flex-col items-center justify-center">
      <div className="w-full"><Header /></div>

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
              Customize your links
            </h2>
            <p className="text-[#737373] text-base">
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

          <div className="flex flex-col gap-4">
            {links.length === 0 ? (
              <div className="flex flex-col text-center rounded-[12px] bg-[#FAFAFA] pb-[46px]">
                <div className="relative w-[200px] h-auto md:w-[300px] md:h-auto mx-auto pt-[46px] md:pt-[84px] lg:pt-[44px]">
                  <Image
                    src="/images/linksBgImage.svg"
                    alt="Background image for links"
                    layout="responsive"
                    width={250}
                    height={160}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-2xl md:text-4xl py-[24px] md:pt-[40px] md:pb-[24px] text-[#333333]">Let’s get you started</h1>
                  <p className="text-base md:pb-[20px] px-[20px] md:px-76px lg:px-[100px]">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                </div>

              </div>
            ) : (
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
            )}
          </div>

          <div className="bg-white h-[26px] md:mt-[41px] lg:pb-10 py-[24px] border-t flex justify-end relative">
            <Button
              width="w-[91px]"
              textColor="#fff"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
