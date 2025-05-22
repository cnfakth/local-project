// lib/firebase/students.ts
import { db } from "./clientApp"; // Make sure you initialize Firestore here
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs
} from "firebase/firestore";

// Type for your student data
export type Student = {
  Birthday: Date;
  Email: string;
  Name: string;
  Parent: string;
  ParentsPhone: string;
  Payment: string;
};

// Get a student by ID
export async function getStudentById(studentId: string): Promise<Student | null> {
  const docRef = doc(db, "students", studentId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as Student) : null;
}

// Get all students
export async function getAllStudents(): Promise<Student[]> {
    const querySnapshot = await getDocs(collection(db, "students"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        Birthday: data.Birthday.toDate(), 
      } as Student;
    });
  }

// Add or overwrite a student
export async function createOrOverwriteStudent(studentId: string, data: Student): Promise<void> {
  await setDoc(doc(db, "students", studentId), data);
}

// Update a student
export async function updateStudent(studentId: string, data: Partial<Student>): Promise<void> {
  await updateDoc(doc(db, "students", studentId), data);
}

// Delete a student
export async function deleteStudent(studentId: string): Promise<void> {
  await deleteDoc(doc(db, "students", studentId));
}
