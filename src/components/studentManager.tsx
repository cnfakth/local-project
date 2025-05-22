"use client";

import { useState } from "react";
import {
  createOrOverwriteStudent,
  updateStudent,
  deleteStudent,
  Student,
} from "@/lib/firebase/students";

export default function StudentManager() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parent, setParent] = useState("");
  const [parentsPhone, setParentsPhone] = useState("");
  const [payment, setPayment] = useState("Monthly");
  const [birthday, setBirthday] = useState("");

  const handleAddOrOverwrite = async () => {
    if (!studentId) return alert("Student ID is required");

    const data: Student = {
      Name: name,
      Email: email,
      Parent: parent,
      ParentsPhone: parentsPhone,
      Payment: payment,
      Birthday: new Date(birthday),
    };

    await createOrOverwriteStudent(studentId, data);
    alert("Student added or overwritten");
  };

  const handleUpdate = async () => {
    if (!studentId) return alert("Student ID is required");
    await updateStudent(studentId, {
      Name: name,
      Email: email,
    });
    alert("Student updated");
  };

  const handleDelete = async () => {
    if (!studentId) return alert("Student ID is required");
    await deleteStudent(studentId);
    alert("Student deleted");
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Student Manager</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Parent Name"
        value={parent}
        onChange={(e) => setParent(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Parent Phone"
        value={parentsPhone}
        onChange={(e) => setParentsPhone(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <select
        className="w-full border p-2 rounded"
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      >
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Annually">Annually</option>
      </select>

      <div className="flex gap-4 justify-between">
        <button
          onClick={handleAddOrOverwrite}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add/Overwrite
        </button>
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
