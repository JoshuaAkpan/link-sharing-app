"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from './Input';
import Button from './Button';
import { updateProfile, getProfile } from '../lib/profile';
import { Profile } from '../types';
import { storage } from '../lib/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileFormProps {
  userId: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId }) => {
  const [profile, setProfile] = useState<Profile>({ firstName: '', lastName: '', email: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB size limit
        alert("Image must be below 1MB");
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert("Please use PNG or JPG format");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      imageUrl = await uploadImage() || imageUrl;
    }
    await updateProfile(userId, { ...profile, imageUrl });
    router.push('/dashboard/links');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-4">
          {imagePreview ? (
            <Image src={imagePreview} alt="Profile" layout="fill" objectFit="cover" className="rounded-full" />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
      <Input
        label="First Name"
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        required
      />
      <Input
        label="Last Name"
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        required
      />
      <Input
        label="Email"
        type="email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        required
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProfileForm;