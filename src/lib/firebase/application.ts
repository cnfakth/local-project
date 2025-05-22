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
  arrayUnion,
  setDoc
} from "firebase/firestore";
import { createSelfPractice } from "./selfPractice";
import { createIndividualClass } from "./individualClass";
import { createOrOverwriteGroupClass } from "./groupClass";

export type Application = {
    ClassType: "groupClass" | "individualClass" | "selfPractice";
    Classroom: string;               // e.g., "classroom/C3"
    StartTime: Date;
    EndTime: Date;
    Status: "待審核" | "同意" | "不同意"; 
    Student: string;                 // "/students/{id}"
    Teacher?: string;               // "/teachers/{id}" (optional for selfPractice)
    SubmitTime: Date;
  };
  

const COLLECTION = "applications";

// Create new application
export async function createApplication(data: Application): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), data);
  return ref.id;
}

// Get single application
export async function getApplication(id: string): Promise<Application | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? (snap.data() as Application) : null;
}

// Get all applications
export async function getAllApplications(): Promise<{ id: string; data: Application }[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map(doc => ({ id: doc.id, data: doc.data() as Application }));
}

// Update application (partial)
export async function updateApplication(id: string, data: Partial<Application>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// Delete application
export async function deleteApplication(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Check for application conflicts
export async function checkApplicationConflict(classroomId: string, start: Date, end: Date): Promise<boolean> {
    const snap = await getDoc(doc(db, "classroom", classroomId));
    if (!snap.exists()) return false;
  
    const unavailable: string[] = snap.data().Unavailable ?? [];
  
    for (const ref of unavailable) {
      const [col, id] = ref.split("/").slice(1); // extract collection and doc ID
      const clsSnap = await getDoc(doc(db, col, id));
      if (!clsSnap.exists()) continue;
  
      const data = clsSnap.data();
      const clsStart = data.StartTime.toDate?.() ?? data.StartTime;
      const clsEnd = data.EndTime.toDate?.() ?? data.EndTime;
  
      const overlap = start < clsEnd && end > clsStart;
      if (overlap) return true;
    }
  
    return false;
  }


// Approve application and create class
export async function approveApplicationAndCreateClass(appId: string, appData: Application) {
    let classRef = "";
    const { ClassType, Classroom, StartTime, EndTime, Student, Teacher } = appData;
  
    if (ClassType === "selfPractice") {
      const id = await createSelfPractice({ Classroom, StartTime, EndTime, Price: "0", Student });
      classRef = `/selfPractice/${id}`;
    } else if (ClassType === "individualClass" && Teacher) {
      const id = await createIndividualClass({ Classroom, StartTime, EndTime, Price: "0", Student, Teacher, Attendance: "pending" });
      classRef = `/individualClass/${id}`;
    } else if (ClassType === "groupClass" && Teacher) {
      const id = `G${StartTime.toISOString().slice(0,10).replace(/-/g,"")}${ClassType}`; // consistent format
      await createOrOverwriteGroupClass(id, { Classroom, StartTime, EndTime, Price: "0", Teacher });
      classRef = `/groupClass/${id}`;
    }
  
    // 1. Update classroom unavailable
    const classroomRef = doc(db, "classroom", Classroom.split("/")[1]);
    await updateDoc(classroomRef, {
      Unavailable: arrayUnion(classRef)
    });
  
    // 2. Update application status
    await updateApplication(appId, { Status: "同意" });
  }

// Reject application
export async function rejectApplication(appId: string): Promise<void> {
  await updateApplication(appId, { Status: "不同意" });
}
