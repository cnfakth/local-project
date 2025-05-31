import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { StudentData, AttendanceRecord } from '../types';
import { generateMockAttendance } from '../mockData';

interface AttendanceModalProps {
  student: StudentData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AttendanceModal({ student, isOpen, onClose }: AttendanceModalProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Load attendance data when student changes
  useEffect(() => {
    if (student && isOpen) {
      setLoading(true);
      // For now, using mock data. You can replace this with actual Firebase calls
      const records = generateMockAttendance(student.studentId);
      setAttendanceRecords(records);
      setLoading(false);
    }
  }, [student, isOpen]);

  if (!isOpen || !student) return null;

  // Generate initials from name for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status badge styling
  const getStatusBadge = (status: 'present' | 'absent' | 'sick') => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'sick':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status: 'present' | 'absent' | 'sick') => {
    switch (status) {
      case 'present':
        return '出席';
      case 'absent':
        return '缺席';
      case 'sick':
        return '病假';
      default:
        return '未知';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header with close button */}
        <div className="relative px-6 pt-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Header with student info */}
        <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-200">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {getInitials(student.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{student.name} - 出席紀錄</h2>
            <p className="text-gray-600">總共 {attendanceRecords.length} 筆紀錄</p>
          </div>
        </div>

        {/* Attendance records */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-gray-600">載入出席紀錄中...</div>
            </div>
          ) : attendanceRecords.length > 0 ? (
            <div className="space-y-3">
              {attendanceRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-gray-800">{record.className}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}
                          >
                            {getStatusText(record.status)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-4">
                            <span>📅 {record.date}</span>
                            {record.startTime && record.endTime && (
                              <span>🕐 {record.startTime} - {record.endTime}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            {record.teacher && <span>👨‍🏫 {record.teacher}</span>}
                            {record.classroom && <span>🏫 {record.classroom}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              暫無出席紀錄
            </div>
          )}
        </div>

        {/* Summary statistics */}
        {attendanceRecords.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {attendanceRecords.filter(r => r.status === 'present').length}
                </div>
                <div className="text-sm text-gray-600">出席</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {attendanceRecords.filter(r => r.status === 'absent').length}
                </div>
                <div className="text-sm text-gray-600">缺席</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {attendanceRecords.filter(r => r.status === 'sick').length}
                </div>
                <div className="text-sm text-gray-600">病假</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}