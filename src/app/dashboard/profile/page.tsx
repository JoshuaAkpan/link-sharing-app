'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import ProfileForm from '../../../components/ProfileForm';
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Profile Details</h1>
        <ProfileForm userId={userId} />
      </main>
    </div>
  );
}