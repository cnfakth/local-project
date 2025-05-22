import { db } from "./clientApp";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export type IndividualClass = {
    Classroom: string;       // e.g. "/classroom/C3"
    StartTime: Date;
    EndTime: Date;
    Price: string;           // e.g. "800"
    Student: string;         // e.g. "/students/T112233445"
    Teacher: string;         // e.g. "/teachers/A000000001"
    Attendance: string;      // e.g. "true", "false", "sick leave"
  };

// Collection reference
const COLLECTION_NAME = "individualClass";

// Create a new individual class (auto-ID)
export async function createIndividualClass(data: IndividualClass): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return docRef.id;
}

// Get one individual class by ID
export async function getIndividualClass(id: string): Promise<IndividualClass | null> {
  const snap = await getDoc(doc(db, COLLECTION_NAME, id));
  return snap.exists() ? (snap.data() as IndividualClass) : null;
}

// Get all individual classes
export async function getAllIndividualClasses(): Promise<{ id: string; data: IndividualClass }[]> {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  return snap.docs.map((doc) => ({ id: doc.id, data: doc.data() as IndividualClass }));
}

// Get all individual classes by teacher ID
export async function getIndividualClassesByTeacher(teacherRef: string): Promise<{ id: string; data: IndividualClass }[]> {
  const q = query(collection(db, COLLECTION_NAME), where("Teacher", "==", teacherRef));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as IndividualClass }));
}

// Update individual class partially
export async function updateIndividualClass(id: string, data: Partial<IndividualClass>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), data);
}

// Delete an individual class
export async function deleteIndividualClass(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Update attendance for a specific individual class
export async function updateIndividualClassAttendance(
    classId: string,
    attendance: string
  ): Promise<void> {
    const classRef = doc(db, COLLECTION_NAME, classId);
    await updateDoc(classRef, { Attendance: attendance });
  }