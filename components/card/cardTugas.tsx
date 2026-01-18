import { formatTanggal } from "@/lib/date";
import { CalendarDateRangeIcon, CheckCircleIcon, ClockIcon, FolderArrowDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ConfirmModal from "../modal/ConfirmModal";

export default function CardTugas({ 
    data, 
    onConfirm 
  } : { 
    data: any ;
    onConfirm : (id: number) => Promise<void> }) {

  const [show, setOpen] = useState(false);
  

  const handleConfirm = async () => {
    await onConfirm(data.id);
    setOpen(false);
  };

  return (
    <>
      <div className="h-full flex flex-col shadow-sm rounded-xl bg-white border border-gray-300 p-6">
        
        <div className="flex flex-row justify-between items-center gap-3 mb-3">
          <h1 className="text-lg font-bold leading-tight">
              {data.matakuliah}
          </h1>

          <button 
            className="cursor-pointer"
            onClick={() => setOpen(true)}>
            <CheckCircleIcon className="w-6 h-6" />
          </button>
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
          <FolderArrowDownIcon className="w-4 h-4" />
          <span className="text-sm">{data.pengumpulan}</span>
        </div>

      </div>

      <ConfirmModal 
        show={show}
        title="Konfirm Tugas"
        message="Apakah kamu yakin sudah menyelesaikan tugas ini?"
        onClose={()=>setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
