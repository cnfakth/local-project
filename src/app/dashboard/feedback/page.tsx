import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { getFirestore, DocumentReference } from "firebase-admin/firestore";

type FeedbackEntry = {
  classId: string;
  content: string;
  score: number;
  studentName: string;
  teacherName: string;
};

type TeacherStats = {
  teacherName: string;
  count: number;
  averageStars: number;
};

export default async function FeedbackPage() {
  const { currentUser, firebaseServerApp } = await getAuthenticatedAppForUser();
  if (!currentUser) redirect("/");

  const db = getFirestore(firebaseServerApp);
  const snapshot = await db.collection("feedback").orderBy("Stars", "desc").limit(10).get();

  const feedbackList: FeedbackEntry[] = [];
  const teacherStatsMap = new Map<string, { totalStars: number; count: number }>();

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const content = data.Content || "";
    const score = data.Stars || 0;

    let classId = "未知班級編號";
    let teacherName = "未知老師";

    if (data.Class instanceof DocumentReference) {
      classId = data.Class.id;
      const classSnap = await data.Class.get();
      if (classSnap.exists) {
        const classData = classSnap.data();
        if (classData?.Teacher instanceof DocumentReference) {
          const teacherSnap = await classData.Teacher.get();
          if (teacherSnap.exists) {
            const teacherData = teacherSnap.data();
            teacherName = teacherData?.Name || "老師名稱未知";

            if (!teacherStatsMap.has(teacherName)) {
              teacherStatsMap.set(teacherName, { totalStars: 0, count: 0 });
            }
            const entry = teacherStatsMap.get(teacherName)!;
            entry.totalStars += score;
            entry.count += 1;
          }
        }
      }
    }

    let studentName = "未知學生";
    if (data.Student instanceof DocumentReference) {
      const studentSnap = await data.Student.get();
      if (studentSnap.exists) {
        const studentData = studentSnap.data();
        studentName = studentData?.Name || "匿名學生";
      }
    }

    feedbackList.push({ classId, content, score, studentName, teacherName });
  }

  const teacherStats: TeacherStats[] = Array.from(teacherStatsMap.entries()).map(
    ([teacherName, { totalStars, count }]) => ({
      teacherName,
      count,
      averageStars: parseFloat((totalStars / count).toFixed(2)),
    })
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col ml-64">
        <Header
          initialUser={{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          }}
        />
        <div className="pt-24 px-6 grid grid-cols-3 gap-6">

          {/* 回饋列表 (佔兩欄) */}
          <div className="col-span-2">
            <h1 className="text-3xl font-semibold mb-6">Recent Feedback</h1>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">最近回饋</h2>
              <ul className="divide-y">
                {feedbackList.map((item, i) => (
                  <li key={i} className="py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium mr-2">{item.classId}</p>
                      <p className="text-gray-500 text-sm font-bold">{item.teacherName} 老師</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="text-gray-500 text-sm mr-2 font-bold">{item.studentName}</p>
                      <p className="text-yellow-500 text-sm">
                        {"★".repeat(item.score) + "☆".repeat(5 - item.score)}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 老師統計 (佔一欄) */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">老師統計</h2>
            <div className="bg-white rounded-xl shadow p-4">
              <ul className="space-y-3">
                {teacherStats.map((teacher, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    <p className="font-medium">{teacher.teacherName} 老師</p>
                    <p>回饋數：{teacher.count}</p>
                    <p>平均星數：{teacher.averageStars} / 5</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
