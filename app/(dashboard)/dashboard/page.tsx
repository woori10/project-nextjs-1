"use client";

import KelasBadge from "@/components/badge/schedules/KelasBadge";
import { useNotes } from "@/components/hooks/useNotes";
import { useSchedules } from "@/components/hooks/useSchedules";
import { formatTanggal } from "@/lib/date";
import { CalendarDateRangeIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export default function DashboardPage() {

    const {
        schedules,
    } = useSchedules();

    const {
        notes,
        loading
    } = useNotes();

    const SkeletonLoader = () => (
        <tr className="animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
            <td key={i} className="py-8 px-6">
                <div className="h-6 bg-gray-200 rounded w-full" />
            </td>
            ))}
        </tr>
    )



  return (
    <div className="m-8">

        <div className="flex justify-between items-center">
            <div className="my-4 py-3">
                <h1 className="text-4xl font-semibold">Jadwal Kuliah</h1>
            </div>
        </div>

        {/* Start Box Jadwal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedules.map((item) => (
                <div
                    key={item.id}
                    className="shadow-sm rounded-xl bg-white border border-gray-300 p-6"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{item.matakuliah}</h1>
                        <KelasBadge kelas={item.kelas} />
                    </div>

                    <p className="text-base font-medium mb-3">
                        {item.ruangan}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                        <span><CalendarDateRangeIcon className="w-6 h-6 text-foreground"/></span>
                        <span>{item.hari}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span><ClockIcon className="w-6 h-6 text-foreground"/></span>
                        <span>{item.mulai}</span>
                        <span>-</span>
                        <span>{item.selesai}</span>
                    </div>
                </div>
            ))}
        </div>
        {/* End Box Jadwal */}

        <div className="pt-8">
            <div className="flex justify-between items-center">
                <div className="my-4 py-3">
                    <h1 className="text-4xl font-semibold">Tugas</h1>
                </div>
            </div>

            <div className="shadow-sm rounded-md">
                <div className="overflow-x-auto">
                    <table className="min-w-[700px] w-full text-2xl border border-gray-300 table-fixed">
                        <thead className="text-center border-b border-gray-300 hover:bg-gray-50">
                            <tr>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Tugas</th>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Matakuliah</th>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Hari (DL)</th>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Waktu (DL)</th>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Pengumpulan</th>
                                <th className="w-1/4 py-8 px-6 font-semibold uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {loading ? (
                                <>
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                                </>
                            ) : (
                            notes.map((item) => (
                                <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="py-8 px-6">{item.tugas}</td>
                                    <td className="py-8 px-6">{item.matakuliah}</td>
                                    <td className="py-8 px-6">{formatTanggal(item.hari)}</td>
                                    <td className="py-8 px-6">{item.waktu}</td>
                                    <td className="py-8 px-6">{item.pengumpulan}</td>
                                     <td className="py-8 px-6">
                                        <div className="flex justify-center items-center">
                                            <CheckCircleIcon  className="w-10 h-10 text-base "/>
                                        </div>
                                     </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

       
        
    </div>

  );
}
