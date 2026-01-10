"use client";

import KelasBadge from "@/components/badge/schedules/KelasBadge";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TernaryButton from "@/components/button/TernaryButton";
import ScheduleModalForm from "@/components/form/FormSchedules";
import { Schedule, useSchedules } from "@/components/hooks/useSchedules";
import DeleteModal from "@/components/modal/DeleteModal";
import { useState } from "react";


export default function SchedulePage() {

    const [openModal, setOpenModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const [selectedSchedulesId, setSelectedSchedulesId] = useState <number | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    const {
        schedules,
        addSchedule,
        updateSchedule,
        deleteNSchedule,
    } = useSchedules();

    const handleSubmitSchedule = (data: Omit <Schedule, "id">) => {
        if (selectedSchedule) {
            updateSchedule (selectedSchedule.id, data)
        } else {
            addSchedule(data);
        }

        setSelectedSchedule(null);
        setOpenModal(false);
    };

    const handleDeleteSchedule = () => {
        if (selectedSchedulesId === null) return ;

        deleteNSchedule(selectedSchedulesId);
        setShowDeleteModal(false);
        setSelectedSchedulesId(null);
    }


  return (
    <div className="m-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-semibold">Jadwal Kuliah</h1>
            </div>
            
            <div className="flex justify-end">
                <TernaryButton
                    type="button"
                    className="my-4 mx-2"
                    onClick={()=>setOpenModal(true)}>
                    Tambah Jadwal
                </TernaryButton>
            </div>
        </div>

        <div className="shadow-sm rounded-md my-4">
            <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-2xl border border-gray-300 table-fixed">
                <thead className="text-center border-b border-gray-300 hover:bg-gray-50">
                    <tr>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Matakuliah</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Ruangan</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Kelas</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Hari</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Mulai</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Selesai</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {schedules.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                            <td className="py-8 px-6">{item.matakuliah}</td>
                            <td className="py-8 px-6">{item.ruangan}</td>
                            <td className="py-8 px-6">
                                <KelasBadge kelas = {item.kelas} />
                            </td>
                            <td className="py-8 px-6">{item.hari}</td>
                            <td className="py-8 px-6">{item.mulai}</td>
                            <td className="py-8 px-6">{item.selesai}</td>
                            <td className="py-8 px-6">
                                <div className="flex gap-3 justify-center px-6">
                                    <PrimaryButton
                                        onClick={() => {
                                            setSelectedSchedule(item);
                                            setOpenModal(true);
                                        }}
                                        >Edit
                                    </PrimaryButton>
                                    <SecondaryButton 
                                        onClick={() => {
                                            setSelectedSchedulesId(item.id);
                                            setShowDeleteModal(true);
                                        }}
                                        >Delete
                                    </SecondaryButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

        {openModal && (
            <ScheduleModalForm
                onClose={() => {
                    setOpenModal(false);
                    setSelectedSchedule(null);
                }}
                onSubmit={handleSubmitSchedule}
                initialData={selectedSchedule}
            />
        )}

        <DeleteModal 
            show={showDeleteModal}
            onClose={()=>setShowDeleteModal(false)}
            onConfirm={handleDeleteSchedule}
            message={"Apakah kamu ingin menghapus jadwal ini?"}
        />
        
    </div>

  );
}
