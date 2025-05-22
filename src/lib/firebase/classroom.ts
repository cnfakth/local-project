import { db } from "./clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export type Classroom = {
    Name: string;              // e.g., "大教室1"
    Capacity: number;          // e.g., 20
    Unavailable: string[];     // array of references to groupClass (as strings)
  };

const COLLECTION = "classroom";

// Create or overwrite classroom
export async function createOrOverwriteClassroom(id: string, data: Classroom): Promise<void> {
  await setDoc(doc(db, COLLECTION, id), data);
}

// Get one classroom
export async function getClassroom(id: string): Promise<Classroom | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? (snap.data() as Classroom) : null;
}

// Get all classrooms
export async function getAllClassrooms(): Promise<{ id: string; data: Classroom }[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((doc) => ({ id: doc.id, data: doc.data() as Classroom }));
}

// Update a classroom (partial)
export async function updateClassroom(id: string, data: Partial<Classroom>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// Update classroom's Unavailable field
export async function addUnavailableTime(classroomId: string, classRef: string): Promise<void> {
    const classroomRef = doc(db, COLLECTION, classroomId);
    await updateDoc(classroomRef, {
        Unavailable: arrayUnion(classRef)
    });
}

// Delete a classroom
export async function deleteClassroom(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function removeClassFromClassroomUnavailable(
  classroomId: string,
  classRef: string
): Promise<void> {
  await updateDoc(doc(db, "classroom", classroomId), {
    Unavailable: arrayRemove(classRef)
  });
}

// Check if a classroom is available during a specific time
export async function checkClassroomAvailability( 
    classroomId: string,
    startTime: Date,
    endTime: Date
  ): Promise<boolean> {
    const snap = await getDoc(doc(db, "classroom", classroomId));
    if (!snap.exists()) return false;
  
    const data = snap.data();
    const unavailableRefs: string[] = data.Unavailable ?? [];
  
    for (const ref of unavailableRefs) {
      const refParts = ref.split("/"); // e.g., "/groupClass/xxx"
      const [collection, id] = [refParts[1], refParts[2]];
      const classSnap = await getDoc(doc(db, collection, id));
      if (!classSnap.exists()) continue;
  
      const cls = classSnap.data();
      const clsStart = cls.StartTime.toDate?.() ?? cls.StartTime;
      const clsEnd = cls.EndTime.toDate?.() ?? cls.EndTime;
  
      const overlap = startTime < clsEnd && endTime > clsStart;
      if (overlap) return false;
    }
  
    return true;
  }

// Get all available classrooms during a specific time
export async function getClassroomsAvailableDuring( 
  startTime: Date,
  endTime: Date
): Promise<string[]> {
  const all = await getAllClassrooms();
  const available: string[] = [];

  for (const { id } of all) {
    const isAvailable = await checkClassroomAvailability(id, startTime, endTime);
    if (isAvailable) available.push(id);
  }

  return available;
}

