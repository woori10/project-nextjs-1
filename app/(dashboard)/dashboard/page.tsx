"use client";

import CardJadwal from "@/components/card/cardJadwal";
import CardTugas from "@/components/card/cardTugas";
import { useNotes } from "@/components/hooks/useNotes";
import { useSchedules } from "@/components/hooks/useSchedules";
import LoaderCard from "@/components/loader/loaderCard";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function DashboardPage() {
  const { schedules, loading: loadingSchedules } = useSchedules();
  const { notes, loading: loadingNotes, deleteNote } = useNotes();

  return (
    <div className="h-full p-4 mx-auto">

      {/* JADWAL */}
      <div id="jadwal" className="flex justify-between items-center lg:mt-2 scroll-mt-16">
        <h1 className="text-xl font-semibold text-gray-800 py-4">Jadwal Kuliah</h1>

        <div className="flex items-center justify-end">
          <Link href="/jadwal-kuliah" >
            <button
              type="button"
              className="flex items-start text-gray-800 text-sm p-2 rounded hover:bg-gray-50 transition"
            >
              <PencilSquareIcon className="w-6 h-6 cursor-pointer"/>
            </button>
          </Link>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {loadingSchedules ? (
           Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
             ) : schedules.length === 0 ? (
            <div className="col-span-full text-center text-sm text-gray-800 shadow-sm rounded-xl bg-white border border-gray-300 p-4">
              Tidak ada Jadwal
            </div>
          ) : ( schedules.map((item) => (
              <CardJadwal key={item.id} data={item} />
            ))
          )}
      </div>

      {/* TUGAS */}
      <div id="tugas" className="flex justify-between items-center mt-2 scroll-mt-16">
        <h1 className="text-xl font-semibold text-gray-800 py-4">Tugas Kuliah</h1>

        <div className="flex items-center justify-end">
          <Link href="/tugas-kuliah" >
            <button
              type="button"
              className="flex items-start text-gray-800 text-sm p-2 rounded hover:bg-gray-50 transition"
            >
              <PencilSquareIcon className="w-6 h-6 cursor-pointer"/>
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {loadingNotes ? (
          Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          ) : notes.length === 0 ? (
            <div className="col-span-full text-center text-sm text-gray-800 shadow-sm rounded-xl bg-white border border-gray-300 p-4">
              Tidak ada Tugas
            </div>
          ) : (
            notes.map((item) => (
              <CardTugas
                key={item.id}
                data={item}
                onConfirm={deleteNote}
              />
            ))
        )}
      </div>

    </div>
  );
}
