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
  orderBy,
  Timestamp,
} from "firebase/firestore";

export type Payment = {
  IssueDate: Timestamp;
  Status: string;
  Student: string;  // Reference path like "/students/studentId"
  Sum: number;
};

export type PaymentWithId = Payment & {
  id: string;
};

const COLLECTION = "payments";

// Create payment
export async function createPayment(data: Payment): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), data);
  return ref.id;
}

// Read one payment by ID
export async function getPayment(id: string): Promise<Payment | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? (snap.data() as Payment) : null;
}

// Read all payments
export async function getAllPayments(): Promise<PaymentWithId[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() as Payment 
  }));
}

// Get payments for a specific student
export async function getPaymentsByStudent(studentRef: string): Promise<PaymentWithId[]> {
  const q = query(
    collection(db, COLLECTION), 
    where("Student", "==", studentRef),
    orderBy("IssueDate", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() as Payment 
  }));
}

// Update payment
export async function updatePayment(id: string, data: Partial<Payment>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// Delete payment
export async function deletePayment(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}