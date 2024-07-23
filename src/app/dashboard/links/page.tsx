'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import LinkItem from '../../../components/LinkItem';
import Button from '../../../components/Button';
import { getLinks, addLink, updateLink, deleteLink } from '../../../lib/links';
import { Link } from '../../../types';
import { auth } from '../../../lib/firebaseConfig';

export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userLinks = await getLinks(user.uid);
        setLinks(userLinks);
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAddLink = async () => {
    if (auth.currentUser) {
      const newLink = {
        platform: 'github',
        url: '',
      };
      const linkId = await addLink(auth.currentUser.uid, newLink);
      setLinks([...links, { ...newLink, id: linkId }]);
    }
  };

  const handleUpdateLink = async (id: string, updates: Partial<Link>) => {
    await updateLink(id, updates);
    setLinks(links.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customize your links</h1>
        <Button onClick={handleAddLink} className="mb-6">+ Add new link</Button>
        {links.map(link => (
          <LinkItem
            key={link.id}
            link={link}
            onUpdate={handleUpdateLink}
            onDelete={handleDeleteLink}
          />
        ))}
      </main>
    </div>
  );
}