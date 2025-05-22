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

// This function retrieves all classes (group, individual, and self-practice) for a specific date.
export async function getClassesByDate(date: Date) {
  const result: any[] = [];
  const targetDay = date.toDateString();
  const types = ["groupClass", "individualClass", "selfPractice"];

  for (const type of types) {
    const snap = await getDocs(collection(db, type));
    snap.forEach(doc => {
      const data = doc.data();
      const classDate = new Date(data.StartTime.toDate?.() ?? data.StartTime);
      if (classDate.toDateString() === targetDay) {
        result.push({ id: doc.id, type, ...data });
      }
    });
  }

  return result;
}

// This function retrieves all classes (group, individual, and self-practice) for a specific student.
export async function getUpcomingClassesForStudent(studentRef: string) {
    const collections = ["groupClass", "individualClass", "selfPractice"];
    const now = new Date();
    const result: any[] = [];
  
    for (const col of collections) {
      const q = query(
        collection(db, col),
        where("Student", "==", studentRef)
      );
      const snap = await getDocs(q);
      snap.forEach(doc => {
        const data = doc.data();
        const start = data.StartTime.toDate?.() ?? data.StartTime;
        if (start > now) result.push({ id: doc.id, type: col, ...data });
      });
    }
  
    // Also check groupClass subcollections
    const groupSnap = await getDocs(collection(db, "groupClass"));
    for (const group of groupSnap.docs) {
      const studentsSnap = await getDocs(collection(db, "groupClass", group.id, "students"));
      studentsSnap.forEach(sub => {
        const subData = sub.data();
        if (subData.Student === studentRef) {
          const groupData = group.data();
          const start = groupData.StartTime.toDate?.() ?? groupData.StartTime;
          if (start > now) {
            result.push({ id: group.id, type: "groupClass", ...groupData });
          }
        }
      });
    }
  
    return result;
  }

  