"use client";

import CardJadwal from "@/components/card/cardJadwal";
import CardTugas from "@/components/card/cardTugas";
import { useNotes } from "@/components/hooks/useNotes";
import { useSchedules } from "@/components/hooks/useSchedules";
import LoaderCard from "@/components/loader/loaderCard";


export default function DashboardPage() {
  const { schedules, loading: loadingSchedules } = useSchedules();
  const { notes, loading: loadingNotes } = useNotes();

  return (
    <div className="h-full p-4">

      {/* JADWAL */}
      <h1 className="text-xl font-semibold my-4">Jadwal Kuliah</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingSchedules
          ? Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          : schedules.map((item) => (
              <CardJadwal key={item.id} data={item} />
            ))}
      </div>

      {/* TUGAS */}
      <h1 className="text-xl font-semibold my-6">Tugas Kuliah</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingNotes
          ? Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)
          : notes.map((item) => (
              <CardTugas key={item.id} data={item} />
            ))}
      </div>

    </div>
  );
}
