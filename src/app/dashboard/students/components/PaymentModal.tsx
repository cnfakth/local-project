import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { db } from '@/lib/firebase/clientApp';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  DocumentReference 
} from 'firebase/firestore';

// Type definitions
interface StudentData {
  id: string;
  name: string;
  studentId: string;
}

interface PaymentData {
  id: string;
  Student: DocumentReference | string;
  Sum: number;
  Status: string;
  IssueDate: any; // Firestore Timestamp
}

interface PaymentModalProps {
  student: StudentData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ student, isOpen, onClose }: PaymentModalProps) {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fetch payments when modal opens
  useEffect(() => {
    if (isOpen && student) {
      fetchPayments();
    }
  }, [isOpen, student]);

  const fetchPayments = async () => {
    if (!student) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Create a document reference for the student
      const studentRef = doc(db, 'students', student.id);
      
      // Query payments collection where Student field matches the student reference
      const paymentsQuery = query(
        collection(db, 'payments'),
        where('Student', '==', studentRef)
      );
      
      const querySnapshot = await getDocs(paymentsQuery);
      const paymentsData: PaymentData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        paymentsData.push({
          id: doc.id,
          Student: data.Student,
          Sum: data.Sum || 0,
          Status: data.Status || '未知',
          IssueDate: data.IssueDate
        });
      });
      
      // Sort by IssueDate (newest first)
      paymentsData.sort((a, b) => {
        const dateA = a.IssueDate?.toDate ? a.IssueDate.toDate() : new Date(0);
        const dateB = b.IssueDate?.toDate ? b.IssueDate.toDate() : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('無法載入繳費記錄');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    try {
      const paymentRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentRef, { Status: newStatus });
      
      // Update local state
      setPayments(prev => 
        prev.map(payment => 
          payment.id === paymentId 
            ? { ...payment, Status: newStatus }
            : payment
        )
      );
    } catch (err) {
      console.error('Error updating payment status:', err);
      setError('更新狀態失敗，請重試');
    }
  };

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
  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'paid':
      case '已繳費':
      case '已付款':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs';
      case 'unpaid':
      case '未繳費':
      case '未付款':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs';
      case 'overdue':
      case '逾期':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs';
    }
  };

  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '未知日期';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (err) {
      return '無效日期';
    }
  };

  // Calculate totals
  const totalAmount = payments.reduce((sum, payment) => sum + payment.Sum, 0);
  const unpaidAmount = payments
    .filter(payment => {
      const status = payment.Status.toLowerCase();
      return status === 'unpaid' || status === '未繳費' || status === '未付款' || status === 'overdue' || status === '逾期';
    })
    .reduce((sum, payment) => sum + payment.Sum, 0);

  // Pagination
  const totalPages = Math.ceil(payments.length / paymentsPerPage);
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const endIndex = startIndex + paymentsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
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
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {getInitials(student.name)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
              <p className="text-gray-600">{student.studentId}</p>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">總金額</p>
              <p className="text-xl font-bold text-gray-800">NT$ {totalAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">未繳金額</p>
              <p className="text-xl font-bold text-red-600">NT$ {unpaidAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">繳費記錄數</p>
              <p className="text-xl font-bold text-blue-600">{payments.length}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {loading && (
            <div className="text-center py-8">
              <div className="text-gray-600">載入中...</div>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600">{error}</div>
              <button 
                onClick={fetchPayments}
                className="mt-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              >
                重試
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  尚無繳費記錄
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-semibold text-gray-700 text-sm">
                    <div>發行日期</div>
                    <div>金額</div>
                    <div>狀態</div>
                    <div>操作</div>
                    <div>備註</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {currentPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50">
                        <div className="text-sm text-gray-800">
                          {formatDate(payment.IssueDate)}
                        </div>
                        <div className="text-sm font-semibold text-gray-800">
                          NT$ {payment.Sum.toLocaleString()}
                        </div>
                        <div>
                          <span className={getStatusBadge(payment.Status)}>
                            {payment.Status}
                          </span>
                        </div>
                        <div>
                          <select 
                            value={payment.Status}
                            onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="未繳費">未繳費</option>
                            <option value="已繳費">已繳費</option>
                            <option value="逾期">逾期</option>
                          </select>
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* Add any additional notes or actions here */}
                          -
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                  >
                    上一頁
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full text-sm font-semibold ${
                        page === currentPage 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                  >
                    下一頁
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}