import { formatTanggal } from "@/lib/date";
import { CalendarDateRangeIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export default function CardTugas({ data }: { data: any }) {
  return (
    <div className="h-full flex flex-col shadow-sm rounded-xl bg-white border border-gray-300 p-6">
      
      <div className="flex flex-row justify-between sm:items-start gap-3 mb-3">
        <h1 className="text-lg font-bold leading-tight">
            {data.matakuliah}
        </h1>

        <CheckCircleIcon className="w-6 h-6" />
      </div>
      

      <p className="text-sm font-medium mb-3">
        {data.tugas}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <CalendarDateRangeIcon className="w-4 h-4" />
        <span className="text-sm">
          {data.hari} ({formatTanggal(data.tanggal)})
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <ClockIcon className="w-4 h-4" />
        <span className="text-sm">{data.waktu}</span>
      </div>

      <div className="flex items-center gap-2">
        <ClockIcon className="w-4 h-4" />
        <span className="text-sm">{data.pengumpulan}</span>
      </div>

    </div>
  );
}
