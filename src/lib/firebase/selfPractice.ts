import { db } from "./clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where
} from "firebase/firestore";

export type SelfPractice = {
    Classroom: string;       // e.g., "/classroom/C3"
    StartTime: Date;
    EndTime: Date;
    Price: string;           // e.g., "400"
    Student: string;         // e.g., "/students/B123456789"
  };
  

const COLLECTION = "selfPractice";

// Create a new self-practice session (auto ID)
export async function createSelfPractice(data: SelfPractice): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return docRef.id;
}

// Read one self-practice by ID
export async function getSelfPractice(id: string): Promise<SelfPractice | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? (snap.data() as SelfPractice) : null;
}

// Read all self-practice sessions
export async function getAllSelfPractice(): Promise<{ id: string; data: SelfPractice }[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((doc) => ({ id: doc.id, data: doc.data() as SelfPractice }));
}

// Update self-practice session (partial)
export async function updateSelfPractice(id: string, data: Partial<SelfPractice>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// Delete self-practice session
export async function deleteSelfPractice(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Filter: Get all self-practice sessions for a specific student
export async function getSelfPracticeByStudent(studentRef: string): Promise<{ id: string; data: SelfPractice }[]> {
  const q = query(collection(db, COLLECTION), where("Student", "==", studentRef));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, data: doc.data() as SelfPractice }));
}
