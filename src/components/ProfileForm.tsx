"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { updateProfile, getProfile } from "../lib/profile";
import { Profile } from "../types";
import { storage } from "../lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import CustomToast from "./CustomToast";

interface ProfileFormProps {
  userId: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId }) => {
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getProfile(userId);
      if (userProfile) {
        setProfile(userProfile);
        if (userProfile.imageUrl) {
          setImagePreview(userProfile.imageUrl);
        }
      }
    };
    fetchProfile();
  }, [userId]);


  
  const handleImageChange = (file: File | null) => {
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB size limit
        alert("Image must be below 1MB");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Please use PNG or JPG format");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const storageRef = ref(storage, `profile-images/${userId}`);
    await uploadBytes(storageRef, imageFile);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = profile.imageUrl;
    if (imageFile) {
      imageUrl = (await uploadImage()) || imageUrl;
    }
    await updateProfile(userId, { ...profile, imageUrl });
    router.push("/dashboard/links");

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
        text="Your changes have been successfully saved!"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6">
        <ProfilePictureUpload onChange={handleImageChange} imagePreview={imagePreview} />
        <div className="flex-1">
          <Input
            label="First Name*"
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="e.g. John"
            icon=""
            
          />
          <Input
            label="Last Name*"
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="e.g. Appleseed"
            
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="e.g. email@example.com"
            
          />
          
          <div className="bg-white h-[26px] md:mt-[41px] lg:pb-10 py-[24px] border-t flex justify-end relative">
            <Button
              width="w-[91px]"
              textColor="#fff"
              onClick={() => alert("Save clicked!")}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
