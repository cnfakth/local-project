// src/app/dashboard/students/mockData.ts
import { AttendanceRecord } from './types';

// Mock student data for testing pagination - you can replace this with real Firebase data
export const mockStudents = [
  { id: 'XXX', name: 'XXX' },
  { id: 'GGG', name: 'GGG' },
  { id: 'OOO', name: 'OOO' },
  { id: 'QQQ', name: 'QQQ' },
  { id: 'AAA', name: 'AAA' },
  { id: 'SSS', name: 'SSS' },
  { id: 'JJJ', name: 'JJJ' },
  { id: 'HHH', name: 'HHH' },
  // Add more students to test pagination
  { id: 'III', name: 'III' },
  { id: 'KKK', name: 'KKK' },
  { id: 'LLL', name: 'LLL' },
  { id: 'MMM', name: 'MMM' },
  { id: 'NNN', name: 'NNN' },
  { id: 'PPP', name: 'PPP' },
  { id: 'RRR', name: 'RRR' },
  { id: 'TTT', name: 'TTT' },
];

// Generate mock attendance data
export const generateMockAttendance = (studentId: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const startDate = new Date(2024, 3, 1); // April 1, 2024
  const classes = ['音樂合奏-A班', '鋼琴-B班', '小提琴-C班'];
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i * 2); // Every other day
    
    const statusOptions: ('present' | 'absent' | 'sick')[] = ['present', 'absent', 'sick'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    
    records.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      className: randomClass,
      status: randomStatus
    });
  }
  
  return records.sort((a, b) => {
    // Sort by date (month/day)
    const [aMonth, aDay] = a.date.split('/').map(Number);
    const [bMonth, bDay] = b.date.split('/').map(Number);
    return bMonth - aMonth || bDay - aDay; // Descending order
  });
};