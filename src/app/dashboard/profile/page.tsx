'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import ProfileForm from '../../../components/ProfileForm';
import Button from "../../../components/Button";
import { auth } from '../../../lib/firebaseConfig';

export default function Profile() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] flex flex-col items-center justify-center">
    <div className="w-full">
      <Header />
    </div>

    <main className="flex w-full max-w-[1440px] p-[24px] gap-[24px] ">
      <div className="flex-1 bg-white rounded-[12px] flex items-center justify-center p-6">
        <div className="w-[307px] h-[631px] bg-[#633CFF] rounded-[12px]"></div>
      </div>

      <div className="flex-1 bg-white rounded-[12px] p-[40px] flex flex-col">
        <div className="mb-6">
          <h2 className="text-[32px] font-bold text-[#333333]">
          Profile Details
          </h2>

          <p className="text-[#737373] text-[16px]">
          Add your details to create a personal touch to your profile.
          </p>
        </div>
        <ProfileForm userId={userId} />
      </div>
    </main>
  </div>

  );
}