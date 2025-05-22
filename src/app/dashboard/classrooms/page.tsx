// app/dashboard/classrooms/page.tsx
"use client";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dummySchedule: Record<string, { time: string; label: string }[]> = {
    Mon: [
      { time: "10:30 - 12:00", label: "葉導室\n個人練習" },
      { time: "12:00 - 14:00", label: "空" },
      { time: "14:00 - 16:00", label: "張老師\n團課" },
    ],
    Tue: [
      { time: "10:30 - 12:00", label: "葉導室\n個人練習" },
      { time: "12:00 - 14:00", label: "空" },
      { time: "14:00 - 16:00", label: "張老師\n團課" },
    ],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };
  

export default function ClassroomPage() {
  const [classroom, setClassroom] = useState("all");
  const [week, setWeek] = useState("本週");

  return (
    <div className="flex">
      <Sidebar />
        <div className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">教室管理</h1>
        <h2 className="text-xl font-semibold mb-4">教室總覽</h2>

        <div className="flex gap-4 mb-6">
            {/* Select 教室 */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">選擇教室</label>
            <select
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                className="rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            >
                <option value="all">所有教室</option>
                <option value="A101">A101</option>
                <option value="B202">B202</option>
            </select>
            </div>

            {/* Select 週次 */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">週次</label>
            <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            >
                <option value="本週">本週</option>
                <option value="下週">下週</option>
            </select>
            </div>
        </div>

        {/* 課表 */}
        <div className="flex gap-4 overflow-x-auto">
            {weekDays.map((day) => (
            <div key={day} className="bg-gray-100 rounded-md p-4 w-36 flex-shrink-0">
                <h3 className="text-center font-semibold mb-2">{day}</h3>
                {dummySchedule[day].map((slot, index) => (
                <div
                    key={index}
                    className="bg-white border rounded-lg p-2 mb-3 text-sm whitespace-pre-wrap text-center shadow-sm"
                >
                    <div className="font-medium">{slot.time}</div>
                    <div className="text-gray-600 mt-1">{slot.label}</div>
                </div>
                ))}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
}
