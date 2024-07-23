import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link } from "../types";

export const addLink = async (
  userId: string,
  link: Omit<Link, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "links"), { ...link, userId });
  return docRef.id;
};

export const updateLink = async (
  linkId: string,
  link: Partial<Link>
): Promise<void> => {
  await updateDoc(doc(db, "links", linkId), link);
};

export const deleteLink = async (linkId: string): Promise<void> => {
  await deleteDoc(doc(db, "links", linkId));
};

export const getLinks = async (userId: string): Promise<Link[]> => {
  const q = query(collection(db, "links"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Link)
  );
};
