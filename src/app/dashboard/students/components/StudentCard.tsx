import React from 'react';
import { StudentData } from '../types';

interface StudentCardProps {
  student: StudentData;
  onShowBasicInfo: (student: StudentData) => void;
  onShowAttendance: (student: StudentData) => void;
  onShowPayment: (student: StudentData) => void;
}

export default function StudentCard({ student, onShowBasicInfo, onShowAttendance, onShowPayment }: StudentCardProps) {
  // Generate initials from name for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {getInitials(student.name)}
        </div>
        
        {/* Student Name */}
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800">{student.name}</h2>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onShowBasicInfo(student)}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            基本資料
          </button>
          <button
            onClick={() => onShowAttendance(student)}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            出席紀錄
          </button>
          <button
            onClick={() => onShowPayment(student)}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            繳費情形
          </button>
        </div>
      </div>
    </div>
  );
}