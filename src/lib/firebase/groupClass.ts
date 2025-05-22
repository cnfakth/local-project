import { db } from "./clientApp";
import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

// Types
export type GroupClass = {
  Classroom: string;              // e.g. "/classroom/C1"
  StartTime: Date;
  EndTime: Date;
  Price: string;                  // string to match the Firestore format
  Teacher: string;                // e.g. "/teachers/A000000001"
};

export type GroupClassStudent = {
  Student: string;                // e.g. "/students/B123456789"
  Attendance: string;             // e.g. "true" or "false"
};

// ========== GROUP CLASS MAIN DOCUMENT ==========

// CREATE or OVERWRITE a group class
export async function createOrOverwriteGroupClass(id: string, data: GroupClass): Promise<void> {
  await setDoc(doc(db, "groupClass", id), data);
}

// READ one group class by ID
export async function getGroupClass(id: string): Promise<GroupClass | null> {
  const snap = await getDoc(doc(db, "groupClass", id));
  return snap.exists() ? (snap.data() as GroupClass) : null;
}

// READ all group classes
export async function getAllGroupClasses(): Promise<{ id: string; data: GroupClass }[]> {
  const snapshot = await getDocs(collection(db, "groupClass"));
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as GroupClass }));
}

// Get all group classes by teacher ID
export async function getGroupClassesByTeacher(teacherRef: string): Promise<{ id: string; data: GroupClass }[]> {
    const q = query(collection(db, "groupClass"), where("Teacher", "==", teacherRef));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as GroupClass }));
  }

// UPDATE a group class (partial)
export async function updateGroupClass(id: string, data: Partial<GroupClass>): Promise<void> {
  await updateDoc(doc(db, "groupClass", id), data);
}

// DELETE a group class
export async function deleteGroupClass(id: string): Promise<void> {
  await deleteDoc(doc(db, "groupClass", id));
}

// ========== GROUP CLASS STUDENTS SUBCOLLECTION ==========

// CREATE or OVERWRITE a student in the group class
export async function addStudentToGroupClass(
  groupId: string,
  studentData: GroupClassStudent
): Promise<void> {
  const subcollectionRef = collection(db, "groupClass", groupId, "students");
  await setDoc(doc(subcollectionRef), studentData); // auto-generated ID
}

// UPDATE a student's attendance or student ref
export async function updateGroupClassStudent(
  groupId: string,
  studentDocId: string,
  data: Partial<GroupClassStudent>
): Promise<void> {
  const studentDocRef = doc(db, "groupClass", groupId, "students", studentDocId);
  await updateDoc(studentDocRef, data);
}

// DELETE a student entry from group class
export async function deleteGroupClassStudent(groupId: string, studentDocId: string): Promise<void> {
  await deleteDoc(doc(db, "groupClass", groupId, "students", studentDocId));
}

// GET all students of a group class
export async function getGroupClassStudents(groupId: string): Promise<{ id: string; data: GroupClassStudent }[]> {
  const snapshot = await getDocs(collection(db, "groupClass", groupId, "students"));
  return snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() as GroupClassStudent }));
}

// UPDATE only the "Attendance" field for a student in a group class
export async function updateGroupClassAttendance(
    groupId: string,
    studentDocId: string,
    attendance: string
  ): Promise<void> {
    const studentRef = doc(db, "groupClass", groupId, "students", studentDocId);
    await updateDoc(studentRef, { Attendance: attendance });
  }