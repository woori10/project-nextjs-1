import { CalendarDateRangeIcon, ClockIcon } from "@heroicons/react/24/solid";
import KelasBadge from "../badge/jadwal/KelasBadge";

export default function CardJadwal({ data }: { data: any }) {
  return (
    <div className="h-full flex flex-col shadow-sm rounded-xl bg-white border border-gray-300 p-6">
      
        <div className="flex flex-row justify-between sm:items-start gap-3 mb-2 text-gray-800">
            <h1 className="text-md font-bold leading-tight">
                {data.matakuliah}
            </h1>

            <KelasBadge kelas={data.kelas} />
        </div>


      <p className="text-sm font-medium mb-3 text-gray-800">
        {data.ruangan}
      </p>

      <div className="flex items-center gap-2 mb-3 text-gray-800">
        <CalendarDateRangeIcon className="w-4 h-4" />
        <span className="text-sm">{data.hari}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-800">
        <ClockIcon className="w-4 h-4 " />
        <span className="text-sm">{data.mulai}</span>
        <span>-</span>
        <span className="text-sm">{data.selesai}</span>
      </div>

    </div>
  );
}
