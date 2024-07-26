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
    <div className="text-[#737373] bg-[#FAFAFA] flex flex-col justify-center items-start md:items-center md:flex-row md:justify-between md:gap-[20px] h-fit rounded-[12px] p-[20px] ">
      <h1 className=" w-[240px]">Profile picture</h1>

      <div className="w-[50%] h-fit flex flex-col md:flex-row md:justify-center md:items-center md:gap-[2px] md:flex-grow ">
        
        <div className="w-64 h-64 relative md:-mb-[60px]">
          {image ? (
            <Image
              src={image}
              alt="Profile"
              width={193}
              height={193}
              className="object-cover rounded-[12px]"
            />
          ) : (
            <div className="w-[193px] h-[193px] bg-gray-200 rounded-[12px]">
              <span className="text-gray-500"></span>
            </div>
          )}

          <div
            className={`absolute h-[193px] w-[193px] inset-0  bg-opacity-50 rounded-[12px] flex flex-col items-center justify-center cursor-pointer ${
              image ? "bg-[#00000080]" : " bg-[#EFEBFF] "
            }`}
          >
            {image ? (
              <div className="flex flex-col justify-center items-center ">
                <Image
                  src="/images/imageUploadIcon.svg"
                  alt="imageUploadIcon"
                  width={40}
                  height={40}
                  className="file-svg-filter"
                />
                <span className="mt-2 text-[#FFFFFF] text-base font-normal">
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
            className="absolute inset-0 opacity-0 cursor-pointer w-[40px] h-[40px]"
          />
        </div>

        <p className="text-sm text-gray-500 h-fit w-[255px]  ">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
