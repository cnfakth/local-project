import Sidebar from "@/components/sidebar";

export default function CoursePage() {
    return(
        <div className="flex">
          <Sidebar />
            <div className="ml-64 p-6">
              <h1 className="text-3xl font-bold mb-4">課程管理</h1>
            </div>
        </div>
    );
}
