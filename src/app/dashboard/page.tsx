// app/dashboard/page.tsx
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default async function DashboardPage() {
  const { currentUser } = await getAuthenticatedAppForUser();

  if (!currentUser) {
    redirect("/"); // If not logged in, go to homepage (or login page)
  }

  // 提取出簡單物件
  const simplifiedUser = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col ml-64">
        <Header initialUser={simplifiedUser} />
        <div className="pt-24 px-6">
          <h1 className="text-3xl font-semibold mb-6">Welcome, {currentUser?.displayName ?? "User"}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">To-Do</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500">學生人數</p>
              <p className="text-3xl font-bold">123</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500">官網瀏覽率</p>
              <p className="text-3xl font-bold">2,345</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500">本日課程</p>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
