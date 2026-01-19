
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppBar() {

  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isJadwal = pathname === "/jadwal-kuliah";
  const isTugas = pathname === "/tugas-kuliah";

  return (
    <div className="fixed top-0 left-0 z-50 border-b border-gray-300 shadow-xs h-14 w-full bg-white text-gray-800">
        <div className="px-8 sm:px-6 lg:px-14 h-full text-sm font-semibold flex justify-between items-center">
            
            <div className="uppercase">
              {isJadwal && <span>Jadwal Kuliah</span>}
              {isTugas && <span>Tugas Kuliah</span>}
              {isDashboard && <span>Dashboard</span>}
            </div>
            
            {isDashboard && (
              <div className="flex gap-6 uppercase">
                <Link href="/dashboard#jadwal">
                  Jadwal Kuliah
                </Link>
                <Link href="/dashboard#tugas">
                  Tugas Kuliah
                </Link>
              </div>
            )}
        </div>
    </div>
  );
}
