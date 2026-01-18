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
    <div className="h-full p-4">

      {/* JADWAL */}
      <div id="jadwal" className="flex justify-between items-center my-4 scroll-mt-16">
        <h1 className="text-xl font-semibold">Jadwal Kuliah</h1>

        <div className="flex items-center justify-end">
          <Link href="/jadwal-kuliah" >
            <button
              type="button"
              className="flex items-start text-black text-sm p-2 rounded hover:bg-gray-50 transition"
            >
              <PencilSquareIcon className="w-6 h-6 cursor-pointer"/>
            </button>
          </Link>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingSchedules
          ? Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          : schedules.map((item) => (
              <CardJadwal key={item.id} data={item} />
            ))}
      </div>

      {/* TUGAS */}
      <div id="tugas" className="flex justify-between items-center pt-4 my-4 scroll-mt-16">
        <h1 className="text-xl font-semibold">Tugas Kuliah</h1>

        <div className="flex items-center justify-end">
          <Link href="/tugas-kuliah" >
            <button
              type="button"
              className="flex items-start text-black text-sm p-2 rounded hover:bg-gray-50 transition"
            >
              <PencilSquareIcon className="w-6 h-6 cursor-pointer"/>
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingNotes
          ? Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          : notes.map((item) => (
              <CardTugas key={item.id} data={item}
                onConfirm={deleteNote} />
            ))}
      </div>

    </div>
  );
}
