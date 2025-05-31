import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface StudentDataInter {
  name: string;
  studentId?: string;
  parentName?: string;
  phone: string;
  lineId: string;
  email?: string;
  address?: string;
  paymentPeriod?: string;
  birthDate?: string;
}

interface StudentInfoModalProps {
  student: StudentDataInter | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentInfoModal({ student, isOpen, onClose }: StudentInfoModalProps) {
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

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header with close button */}
        <div className="relative px-6 pt-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Avatar and Name Section */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {getInitials(student.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-gray-600">{student.birthDate}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 pb-6 space-y-4">
          {/* Row 1: 學號 and 家長姓名 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">學號</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.studentId}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">家長姓名</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.parentName}</span>
              </div>
            </div>
          </div>

          {/* Row 2: 聯絡電話 and Line名稱 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.phone}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Line名稱</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.lineId}</span>
              </div>
            </div>
          </div>

          {/* Row 3: 電子信箱 and 繳費週期 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電子信箱</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.email}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">繳費週期(月/週)</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{student.paymentPeriod}</span>
              </div>
            </div>
          </div>

          {/* Row 4: 地址 (full width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-gray-800">{student.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}