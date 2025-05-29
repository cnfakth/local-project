export type StudentData = {
  id: string;
  name: string;
  studentId?: string;
  parentName?: string;
  phone?: string;
  lineId?: string;
  email?: string;
  address?: string;
  paymentPeriod?: string;
  birthDate?: string;
};

export type AttendanceRecord = {
  date: string;
  className: string;
  status: 'present' | 'absent' | 'sick';
};

export type StudentCardProps = {
  student: StudentData;
  onShowBasicInfo: (student: StudentData) => void;
  onShowAttendance: (student: StudentData) => void;
};