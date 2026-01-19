"use client";

import KelasBadge from "@/components/badge/jadwal/KelasBadge";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TernaryButton from "@/components/button/TernaryButton";
import ScheduleModalForm from "@/components/form/FormSchedules";
import { Schedule, useSchedules } from "@/components/hooks/useSchedules";
import DeleteModal from "@/components/modal/DeleteModal";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function SchedulePage() {
  const [openModal, setOpenModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSchedulesId, setSelectedSchedulesId] = useState<number | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const {
    schedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    loading,
  } = useSchedules();

  const SkeletonLoader = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="py-4 px-3">
          <div className="h-6 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );

  const handleSubmitSchedule = (data: Omit<Schedule, "id">) => {
    if (selectedSchedule) {
      updateSchedule(selectedSchedule.id, data);
    } else {
      addSchedule(data);
    }

    setSelectedSchedule(null);
    setOpenModal(false);
  };

  const handleDeleteSchedule = () => {
    if (selectedSchedulesId === null) return;
    deleteSchedule(selectedSchedulesId);
    setShowDeleteModal(false);
    setSelectedSchedulesId(null);
  };

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-start">
          <Link href="/dashboard">
            <button className="text-sm p-2 rounded hover:bg-gray-50 transition">
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-gray-800 cursor-pointer" />
            </button>
          </Link>
        </div>

        <div className="flex justify-end">
          <TernaryButton
            type="button"
            className="my-4 text-xs"
            onClick={() => setOpenModal(true)}
          >
            Tambah Jadwal
          </TernaryButton>
        </div>
      </div>

      {/* Table */}
      <div className="shadow-sm rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border border-gray-300 bg-white text-gray-800">
            <thead className="text-center border-b text-sm border-gray-300">
              <tr>
                <th className="p-4 font-semibold uppercase">Matakuliah</th>
                <th className="p-4 font-semibold uppercase">Ruangan</th>
                <th className="p-4 font-semibold uppercase">Kelas</th>
                <th className="p-4 font-semibold uppercase">Hari</th>
                <th className="p-4 font-semibold uppercase">Pukul</th>
                {/* <th className="w-1/4 py-4 px-3 font-semibold uppercase">Selesai</th> */}
                <th className="p-4 font-semibold uppercase">Action</th>
              </tr>
            </thead>

            <tbody className="text-center text-xs">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                schedules.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-300"
                  >
                    <td className="p-4">{item.matakuliah}</td>
                    <td className="p-4">{item.ruangan}</td>
                    <td className="p-4">
                      <KelasBadge kelas={item.kelas} />
                    </td>
                    <td className="p-4">{item.hari}</td>
                    <td className="p-4">{item.mulai} - {item.selesai}</td>
                    {/* <td className="py-4 px-3">{item.selesai}</td> */}
                    <td className="p-4">
                      <div className="flex gap-3 justify-center px-6">
                        <PrimaryButton
                          onClick={() => {
                            setSelectedSchedule(item);
                            setOpenModal(true);
                          }}
                        >
                          Edit
                        </PrimaryButton>
                        <SecondaryButton
                          onClick={() => {
                            setSelectedSchedulesId(item.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </SecondaryButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <ScheduleModalForm
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleSubmitSchedule}
        initialData={selectedSchedule}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSchedule}
        message="Apakah kamu ingin menghapus jadwal ini?"
      />
    </div>
  );
}
