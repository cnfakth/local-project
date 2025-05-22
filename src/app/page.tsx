import StudentManager from "@/components/studentManager";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import Link from "next/link";

export default async function Home() {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50 text-gray-900">
      {/* <main className="max-w-4xl mx-auto flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Student Directory</h1>
        <StudentManager />
      </main> */}
      <main className="max-w-4xl mx-auto flex flex-col gap-10">
        {currentUser && (
          <Link
            href="/dashboard"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium shadow-md transition duration-200 mt-6"
          >
            Go to Dashboard
          </Link>
        )}
      </main>
    </div>
  );
}
