// components/sidebar.tsx
"use client";
import Link from "next/link";
import { Home, Users, BookOpen, ClipboardList, Star, Settings, Calendar } from "lucide-react";  // 添加 Calendar 和其他圖標

const menuItems = [
  { label: "主頁", icon: <Home size={20} />, href: "/dashboard" },
  { label: "學生管理", icon: <Users size={20} />, href: "/dashboard/students" },
  { label: "教室管理", icon: <BookOpen size={20} />, href: "/dashboard/classrooms" },
  { label: "課程管理", icon: <ClipboardList size={20} />, href: "/dashboard/courses" },
  { label: "學生回饋", icon: <Star size={20} />, href: "/dashboard/feedback" },
  { label: "課程推薦", icon: <Calendar size={20} />, href: "/dashboard/recommendation" },
  { label: "設置", icon: <Settings size={20} />, href: "/dashboard/settings" }, // 新增設置
];

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-6 fixed left-0 top-24"> {/* Added top-24 */}
      
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
