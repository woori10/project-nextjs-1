"use client";

import StatusBadge from "@/components/badge/notes/StatusBadge";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import TernaryButton from "@/components/button/TernaryButton";
import ModalForm from "@/components/form/FormNotes";
import { Note, useNotes } from "@/components/hooks/useNotes";
import DeleteModal from "@/components/modal/DeleteModal";
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
    } = useNotes();

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
    <div className="m-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-semibold">Personal Notes</h1>
            </div>
            
            <div className="flex justify-end">
                <TernaryButton
                    type="button"
                    className="my-4 mx-2"
                    onClick={()=>setOpenModal(true)}>
                    Tambah Notes
                </TernaryButton>
            </div>
        </div>

        <div className="shadow-sm rounded-md my-4">
            <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-2xl border border-gray-300 table-fixed">
                <thead className="text-center border-b border-gray-300 hover:bg-gray-50">
                    <tr>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Notes</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Kategori</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Status</th>
                        <th className="w-1/4 py-8 px-6 font-semibold uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {notes.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-50">
                            <td className="py-8 px-6">{item.notes}</td>
                            <td className="py-8 px-6">{item.kategori}</td>
                            <td className="py-8 px-6">
                                <StatusBadge status = {item.status} />
                            </td>
                            <td className="py-8 px-6">
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
                    ))}
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
            message={"Apakah kamu ingin menghapus notes ini?"}
        />
        
    </div>

  );
}
