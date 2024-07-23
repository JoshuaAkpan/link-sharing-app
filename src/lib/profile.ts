import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Profile } from '../types';

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const docRef = doc(db, 'profiles', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as Profile : null;
};

export const updateProfile = async (userId: string, profile: Profile): Promise<void> => {
  const docRef = doc(db, 'profiles', userId);
  await setDoc(docRef, profile, { merge: true });
};