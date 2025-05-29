'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import StudentCard from './components/StudentCard';
import Pagination from './components/Pagination';
import StudentInfoModal from './components/StudentInfoModal';
import AttendanceModal from './components/AttendanceModal';
import { mockStudents } from './mockData';
import { StudentData } from './types';
import { getAllStudents, Student } from '@/lib/firebase/students';
import Sidebar from '@/components/sidebar';

export default function StudentsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<StudentData[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>(mockStudents);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  const STUDENTS_PER_PAGE = 6;

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const endIndex = startIndex + STUDENTS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, students]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentData = await getAllStudents();
        const formatted: StudentData[] = studentData.map((student: Student, index: number) => ({
          id: `student-${index}`,
          name: student.Name || '未知學生',
          studentId: `student-${index}`,
          parentName: student.Parent || '未提供',
          phone: student.Phone || student.ParentsPhone || '未提供',
          lineId: student.Line || '未提供',
          email: student.Email || '未提供',
          address: '未提供',
          paymentPeriod: student.Payment || '未提供',
          birthDate: student.Birthday ? new Date(student.Birthday).toLocaleDateString('zh-TW') : '未提供',
        }));
        setStudents(formatted);
        setFilteredStudents(formatted);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowBasicInfo = (student: StudentData) => {
    setSelectedStudent(student);
    setIsBasicInfoModalOpen(true);
  };

  const handleShowAttendance = (student: StudentData) => {
    setSelectedStudent(student);
    setIsAttendanceModalOpen(true);
  };

  const handleCloseBasicInfoModal = () => {
    setIsBasicInfoModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen ml-64 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">學生管理</h1>

        <div className="mb-8">
          <SearchBar 
            query={searchQuery}
            onQueryChange={setSearchQuery}
            placeholder="輸入學生姓名"
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-600">載入中...</div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student} 
                  onShowBasicInfo={handleShowBasicInfo}
                  onShowAttendance={handleShowAttendance}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                {searchQuery ? '找不到符合的學生' : '沒有學生資料'}
              </div>
            )}
          </div>
        )}

        {!loading && filteredStudents.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange}
            />
            <div className="text-sm text-gray-500">
              顯示第 {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} 項，共 {filteredStudents.length} 位學生
            </div>
          </div>
        )}

        <StudentInfoModal
          student={selectedStudent}
          isOpen={isBasicInfoModalOpen}
          onClose={handleCloseBasicInfoModal}
        />

        <AttendanceModal
          student={selectedStudent}
          isOpen={isAttendanceModalOpen}
          onClose={handleCloseAttendanceModal}
        />
      </div>
    </div>
  );
}