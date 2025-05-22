'use client';

import { useEffect, useState } from "react";
import { getAllStudents, Student } from "@/lib/firebase/students";

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-600">Loading students...</p>;
  if (students.length === 0) return <p>No students found.</p>;

  return (
    <div className="grid gap-6">
      {students.map((student, index) => (
        <div
          key={index}
          className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold">{student.Name}</h2>
          <p><strong>Email:</strong> {student.Email}</p>
          <p><strong>Birthday:</strong> {new Date(student.Birthday).toLocaleDateString()}</p>
          <p><strong>Parent:</strong> {student.Parent}</p>
          <p><strong>Phone:</strong> {student.ParentsPhone}</p>
          <p><strong>Payment:</strong> {student.Payment}</p>
        </div>
      ))}
    </div>
  );
}
