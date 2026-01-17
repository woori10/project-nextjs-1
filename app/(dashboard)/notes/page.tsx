"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TernaryButton from "@/components/button/TernaryButton";
import ModalForm from "@/components/form/FormNotes";
import { Note, useNotes } from "@/components/hooks/useNotes";
import DeleteModal from "@/components/modal/DeleteModal";
import { formatTanggal } from "@/lib/date";
import { useState } from "react";

export default function NotesPage() {

    const [openModal, setOpenModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const [selectedNotesId, setSelectedNotesId] = useState <number | null>(null);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const {
        notes,
        addNote,
        updateNote,
        deleteNote,
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

    const handleSubmitNote = (data: Omit <Note, "id">) => {
        if (selectedNote) {
            updateNote (selectedNote.id, data)
        } else {
            addNote(data);
        }

        setSelectedNote(null);
        setOpenModal(false);
    };


    const handleDeleteNote = () => {
        if (selectedNotesId === null) return ;

        deleteNote(selectedNotesId);
        setShowDeleteModal(false);
        setSelectedNotesId(null);
    }


  return (
    <div className="h-full p-4">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-xl font-semibold">Tugas Kuliah</h1>
            </div>
            
            <div className="flex justify-end">
                <TernaryButton
                    type="button"
                    className="my-4"
                    onClick={()=>setOpenModal(true)}>
                    Tambah Tugas
                </TernaryButton>
            </div>
        </div>

        <div className="shadow-sm rounded-md">
            <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border border-gray-300 table-fixed bg-white">
                <thead className="text-center border-b text-sm border-gray-300">
                    <tr>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Tugas</th>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Matakuliah</th>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Hari (DL)</th>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Waktu (DL)</th>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Pengumpulan</th>
                        <th className="w-1/4 py-4 px-3 font-semibold uppercase">Action</th>
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
                    notes.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300">
                            <td className="py-4 px-3">{item.tugas}</td>
                            <td className="py-4 px-3">{item.matakuliah}</td>
                            <td className="py-4 px-3">{item.hari} ({formatTanggal(item.tanggal)})</td>
                            <td className="py-4 px-3">{item.waktu}</td>
                            <td className="py-4 px-3">{item.pengumpulan}</td>

                            {/* Status */}
                            {/* <td className="py-8 px-6">
                                <StatusBadge status = {item.status} />
                            </td> */}

                            <td className="py-4 px-3">
                                <div className="flex gap-3 justify-center px-6">
                                    <PrimaryButton
                                        onClick={() => {
                                            setSelectedNote(item);
                                            setOpenModal(true);
                                        }}
                                        >Edit
                                    </PrimaryButton>
                                    <SecondaryButton 
                                        onClick={() => {
                                            setSelectedNotesId(item.id);
                                            setShowDeleteModal(true);
                                        }}>
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

        {openModal && (
            <ModalForm
                onClose={() => {
                    setOpenModal(false);
                    setSelectedNote(null);
                }}
                onSubmit={handleSubmitNote}
                initialData={selectedNote}
            />
        )}

        <DeleteModal 
            show={showDeleteModal}
            onClose={()=>setShowDeleteModal(false)}
            onConfirm={handleDeleteNote}
            message={"Apakah kamu ingin menghapus tugas ini?"}
        />
        
    </div>

  );
}
