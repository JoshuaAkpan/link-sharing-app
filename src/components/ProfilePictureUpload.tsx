import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfilePictureUploadProps {
  onChange: (file: File | null) => void;
  imagePreview: string | null;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ onChange, imagePreview }) => {
  const [image, setImage] = useState<string | null>(imagePreview);

  useEffect(() => {
    setImage(imagePreview);
  }, [imagePreview]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="text-[#737373] flex flex-col md:items-center md:flex-row md:justify-center">
      <h1 className="">Profile picture</h1>

      <div className="w-64 h-64 relative mb-4">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            width={193}
            height={193}
            className="object-cover rounded-[12px]"
          />
        ) : (
          <div className="w-[193px] h-[193px] bg-gray-200 rounded-[12px] flex items-center justify-center">
            <span className="text-gray-500"></span>
          </div>
        )}
        <div className="absolute h-[193px] w-[193px] inset-0 bg-[#EFEBFF] bg-opacity-50 rounded-[12px] flex flex-col items-center justify-center cursor-pointer ">
          <svg
            className="w-12 h-12 text-[#633CFF]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18M4 8h16m-4 8H4"
            />
          </svg>
          <span className="mt-4 text-[#633CFF] text-base font-semibold">+ Upload Image</span>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center md:h-[54px] md:w-[127px]">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  );
};

export default ProfilePictureUpload;
