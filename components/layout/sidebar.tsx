import { CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";



export default function Sidebar() {
  return (
    <aside className="top-0 left-0 z-40 w-100 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-400 bg-white px-6 py-8 shadow-sm">
      <div className="h-full px-2 py-8 overflow-y-auto bg-white">

        {/* <h1 className="flex items-center text-center text-5xl font-semibold">
          Daily Management
        </h1> */}

        <nav className="flex flex-col mt-28 space-y-5 text-3xl">
          <Link
            href="/schedule"
            className="flex items-center gap-6 rounded-md px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <CalendarDaysIcon className="w-8 h-8"/>
            Jadwal Kuliah
          </Link>
          <Link
            href="/notes"
            className="flex items-center gap-6 rounded-md px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <DocumentTextIcon className="w-8 h-8"/>
            Personal Notes
          </Link>
          {/* <Link
            href="/task"
            className="flex items-center gap-6 rounded-md px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <CheckCircleIcon className="w-8 h-8"/>
            Tasks
          </Link> */}
        </nav>
      </div>
      
    </aside>
  );
}