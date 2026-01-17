import { CalendarDaysIcon, DocumentTextIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function Sidebar({
  open,
  onClose,
} : {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
        />
      )}
      <aside
        className={`
          top-0 left-0 z-40 px-4 py-8 bg-white w-64 h-full-screen
          transition-transform
          -translate-x-full sm:translate-x-0
          border-r border-gray-300 shadow-sm
          ${open ? "translate-x-0" : ""}
        `}
      >
        <div className="h-full overflow-y-auto bg-white">

          {/* <h1 className="flex items-center text-center text-5xl font-semibold">
            Daily Management
          </h1> */}

          <nav className="flex flex-col mt-16 space-y-2 text-base bg-white">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-sm px-4 py-3 hover:bg-gray-100 transition"
            >
              <Squares2X2Icon className="w-5 h-5"/>
              Dashboard
            </Link>
            <Link
              href="/schedule"
              className="flex items-center gap-3 rounded-sm px-4 py-3 hover:bg-gray-100 transition"
            >
              <CalendarDaysIcon className="w-5 h-5"/>
              Jadwal Kuliah
            </Link>
            <Link
              href="/notes"
              className="flex items-center gap-3 rounded-sm px-4 py-3 hover:bg-gray-100 transition"
            >
              <DocumentTextIcon className="w-5 h-5"/>
              Tugas Kuliah
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
    </>
   
  );
}