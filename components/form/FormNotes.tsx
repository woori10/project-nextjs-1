"use client";
import { useEffect, useState } from "react";
import TernaryButton from "../button/TernaryButton";

type ModalProps ={
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
};

export default function NotesModalForm ({ onClose, onSubmit, initialData }: ModalProps) {
    
    const status =["Soon", "On Progress", "Pending", "Done"]
    const kategori =["Tugas Kuliah", "Belajar Bahasa Korea", "Shooping", "Lifestyle"]

    const [formData, setFormData] = useState({
        notes: "",
        kategori: "",
        status: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = "auto";
        };
    }, []);

    useEffect (() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            />

            <div className="relative w-full max-w-xl rounded-lg bg-white p-8 border border-gray-300 shadow-lg animate-modal">
                 
                 <form onSubmit={handleSubmit} className="space-y-6 p-8">

                    <h1 className="text-center text-4xl font-medium mb-8">
                        {initialData? "Edit Notes" : "Tambah Notes"}
                    </h1>

                    <div>
                        <label className="block mb-3 text-2xl font-medium text-heading">Notes</label>
                        <input 
                            type="text" 
                            placeholder="Tambahkan Notes" 
                            className="block text-2xl border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full px-3 py-3 shadow-xs"
                            value={formData.notes}
                            onChange={(e) => 
                                setFormData({...formData, notes: e.target.value})
                            }    
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-2xl font-medium text-heading">Kategori</label>
                        <select 
                            value={formData.kategori}
                            onChange={(e) => 
                                setFormData({...formData, kategori: e.target.value})
                            }
                            className="w-full rounded-md border px-2 py-3 text-2xl">
                            
                            <option value="" disabled>Pilih Kategori</option>

                            {kategori.map((kategori) => (
                                <option key={kategori} value={kategori}>
                                    {kategori}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-3 text-2xl font-medium text-heading">Status</label>
                        <select 
                            value={formData.status}
                            onChange={(e) => 
                                setFormData({...formData, status: e.target.value})
                            }
                            className="w-full rounded-md border px-2 py-3 text-2xl">

                            <option value="" disabled>Pilih Status</option>

                            {status.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <TernaryButton type="submit" className="mt-4">
                            {initialData? "Simpan" : "Tambah"}
                        </TernaryButton>
                    </div>
                </form>

            </div>
        </div>
    );
};
