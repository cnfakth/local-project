// src/app/dashboard/students/mockData.ts
import { AttendanceRecord, StudentData } from './types';

// Mock student data for testing pagination - you can replace this with real Firebase data
export const mockStudents: StudentData[] = [
  { 
    id: 'XXX', 
    name: 'XXX',
    studentId: 'XXX',
    parentName: '家長XXX',
    phone: '0912-345-678',
    lineId: 'lineXXX',
    email: 'xxx@example.com',
    address: '台北市信義區XXX路XXX號',
    paymentPeriod: '月繳',
    birthDate: '2010/05/15'
  },
  { 
    id: 'GGG', 
    name: 'GGG',
    studentId: 'GGG',
    parentName: '家長GGG',
    phone: '0923-456-789',
    lineId: 'lineGGG',
    email: 'ggg@example.com',
    address: '台北市大安區GGG路GGG號',
    paymentPeriod: '季繳',
    birthDate: '2011/03/22'
  },
  { 
    id: 'OOO', 
    name: 'OOO',
    studentId: 'OOO',
    parentName: '家長OOO',
    phone: '0934-567-890',
    lineId: 'lineOOO',
    email: 'ooo@example.com',
    address: '台北市中山區OOO路OOO號',
    paymentPeriod: '月繳',
    birthDate: '2009/08/10'
  },
  { 
    id: 'QQQ', 
    name: 'QQQ',
    studentId: 'QQQ',
    parentName: '家長QQQ',
    phone: '0945-678-901',
    lineId: 'lineQQQ',
    email: 'qqq@example.com',
    address: '台北市松山區QQQ路QQQ號',
    paymentPeriod: '年繳',
    birthDate: '2012/12/05'
  },
  { 
    id: 'AAA', 
    name: 'AAA',
    studentId: 'AAA',
    parentName: '家長AAA',
    phone: '0956-789-012',
    lineId: 'lineAAA',
    email: 'aaa@example.com',
    address: '台北市內湖區AAA路AAA號',
    paymentPeriod: '月繳',
    birthDate: '2010/07/18'
  },
  { 
    id: 'SSS', 
    name: 'SSS',
    studentId: 'SSS',
    parentName: '家長SSS',
    phone: '0967-890-123',
    lineId: 'lineSSS',
    email: 'sss@example.com',
    address: '台北市南港區SSS路SSS號',
    paymentPeriod: '季繳',
    birthDate: '2011/04/30'
  },
  { 
    id: 'JJJ', 
    name: 'JJJ',
    studentId: 'JJJ',
    parentName: '家長JJJ',
    phone: '0978-901-234',
    lineId: 'lineJJJ',
    email: 'jjj@example.com',
    address: '台北市文山區JJJ路JJJ號',
    paymentPeriod: '月繳',
    birthDate: '2009/11/12'
  },
  { 
    id: 'HHH', 
    name: 'HHH',
    studentId: 'HHH',
    parentName: '家長HHH',
    phone: '0989-012-345',
    lineId: 'lineHHH',
    email: 'hhh@example.com',
    address: '台北市萬華區HHH路HHH號',
    paymentPeriod: '年繳',
    birthDate: '2012/01/25'
  },
  // Add more students to test pagination
  { 
    id: 'III', 
    name: 'III',
    studentId: 'III',
    parentName: '家長III',
    phone: '0912-111-222',
    lineId: 'lineIII',
    email: 'iii@example.com',
    address: '台北市中正區III路III號',
    paymentPeriod: '月繳',
    birthDate: '2010/09/08'
  },
  { 
    id: 'KKK', 
    name: 'KKK',
    studentId: 'KKK',
    parentName: '家長KKK',
    phone: '0923-222-333',
    lineId: 'lineKKK',
    email: 'kkk@example.com',
    address: '台北市大同區KKK路KKK號',
    paymentPeriod: '季繳',
    birthDate: '2011/06/14'
  },
  { 
    id: 'LLL', 
    name: 'LLL',
    studentId: 'LLL',
    parentName: '家長LLL',
    phone: '0934-333-444',
    lineId: 'lineLLL',
    email: 'lll@example.com',
    address: '台北市士林區LLL路LLL號',
    paymentPeriod: '月繳',
    birthDate: '2009/02/28'
  },
  { 
    id: 'MMM', 
    name: 'MMM',
    studentId: 'MMM',
    parentName: '家長MMM',
    phone: '0945-444-555',
    lineId: 'lineMMM',
    email: 'mmm@example.com',
    address: '台北市北投區MMM路MMM號',
    paymentPeriod: '年繳',
    birthDate: '2012/10/03'
  },
  { 
    id: 'NNN', 
    name: 'NNN',
    studentId: 'NNN',
    parentName: '家長NNN',
    phone: '0956-555-666',
    lineId: 'lineNNN',
    email: 'nnn@example.com',
    address: '台北市信義區NNN路NNN號',
    paymentPeriod: '月繳',
    birthDate: '2010/12/17'
  },
  { 
    id: 'PPP', 
    name: 'PPP',
    studentId: 'PPP',
    parentName: '家長PPP',
    phone: '0967-666-777',
    lineId: 'linePPP',
    email: 'ppp@example.com',
    address: '台北市大安區PPP路PPP號',
    paymentPeriod: '季繳',
    birthDate: '2011/05/09'
  },
  { 
    id: 'RRR', 
    name: 'RRR',
    studentId: 'RRR',
    parentName: '家長RRR',
    phone: '0978-777-888',
    lineId: 'lineRRR',
    email: 'rrr@example.com',
    address: '台北市中山區RRR路RRR號',
    paymentPeriod: '月繳',
    birthDate: '2009/08/21'
  },
  { 
    id: 'TTT', 
    name: 'TTT',
    studentId: 'TTT',
    parentName: '家長TTT',
    phone: '0989-888-999',
    lineId: 'lineTTT',
    email: 'ttt@example.com',
    address: '台北市松山區TTT路TTT號',
    paymentPeriod: '年繳',
    birthDate: '2012/03/06'
  },
];

// Generate mock attendance data
export const generateMockAttendance = (studentId: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const startDate = new Date(2024, 3, 1); // April 1, 2024
  const classes = ['音樂合奏-A班', '鋼琴-B班', '小提琴-C班'];
  const teachers = ['張老師', '李老師', '王老師'];
  const classrooms = ['A101', 'B202', 'C303'];
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i * 2); // Every other day
    
    const statusOptions: ('present' | 'absent' | 'sick')[] = ['present', 'absent', 'sick'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    const randomClassroom = classrooms[Math.floor(Math.random() * classrooms.length)];
    
    records.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      className: randomClass,
      status: randomStatus,
      startTime: '14:00',
      endTime: '16:00',
      teacher: randomTeacher,
      classroom: randomClassroom
    });
  }
  
  return records.sort((a, b) => {
    // Sort by date (month/day)
    const [aMonth, aDay] = a.date.split('/').map(Number);
    const [bMonth, bDay] = b.date.split('/').map(Number);
    return bMonth - aMonth || bDay - aDay; // Descending order
  });
};