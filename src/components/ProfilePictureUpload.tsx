import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfilePictureUploadProps {
  onChange: (file: File | null) => void;
  imagePreview: string | null;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onChange,
  imagePreview,
}) => {
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
    <div className="text-[#737373] bg-[#FAFAFA] flex flex-col  md:items-center md:flex-row md:justify-center md:gap-[12px] md:h-[] rounded-[12px] p-[20px] items-center">
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

        <div className={`absolute h-[193px] w-[193px] inset-0  bg-opacity-50 rounded-[12px] flex flex-col items-center justify-center cursor-pointer ${image ? 'bg-[#EFEBFF]':'bg-[#00000080]'}`}>

          {image ? (
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/images/imageUploadIcon.svg"
                alt="imageUploadIcon"
                width={40}
                height={40}
                className="fill-[#FFFFFF]"
              />
              <span className="mt-4 text-[#FFFFFF] text-base font-semibold">
                Change Image
              </span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/images/imageUploadIcon.svg"
                alt="imageUploadIcon"
                width={40}
                height={40}
                className="text-[#633CFF]"
              />
              <span className="mt-4 text-[#633CFF] text-base font-semibold">
                + Upload Image
              </span>
            </div>
          )}
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
