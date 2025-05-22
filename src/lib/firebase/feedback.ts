import { db } from "./clientApp";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export type Feedback = {
    Student: string;              // required: e.g., "/students/B123456789"
    Stars: number;                // required
    Content?: string;             // optional
    Class?: string;               // optional: e.g., "/groupClass/G20250501Marimba"
    Teacher?: string;             // optional: e.g., "/teachers/A000000001"
  };
  

const COLLECTION = "feedback";

// Create feedback (auto ID)
export async function createFeedback(data: Feedback): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), data);
  return ref.id;
}

// Read one feedback by ID
export async function getFeedback(id: string): Promise<Feedback | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? (snap.data() as Feedback) : null;
}

// Read all feedback entries
export async function getAllFeedback(): Promise<{ id: string; data: Feedback }[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map(doc => ({ id: doc.id, data: doc.data() as Feedback }));
}

// Update feedback (partial)
export async function updateFeedback(id: string, data: Partial<Feedback>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// Delete feedback
export async function deleteFeedback(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Get feedback for a specific class
export async function getFeedbackByClass(classRef: string): Promise<Feedback[]> {
    const q = query(collection(db, COLLECTION), where("Class", "==", classRef));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Feedback);
  }
  
// Get feedback for a specific teacher
export async function getFeedbackByTeacher(teacherRef: string): Promise<Feedback[]> {
  const q = query(collection(db, COLLECTION), where("Teacher", "==", teacherRef));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Feedback);
}

// Get feedback by a specific student
export async function getFeedbackByStudent(studentRef: string): Promise<Feedback[]> {
  const q = query(collection(db, COLLECTION), where("Student", "==", studentRef));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as Feedback);
}

