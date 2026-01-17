"use client";
import { useEffect, useState } from "react";
import TernaryButton from "../button/TernaryButton";

type ModalProps ={
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
};

export default function NotesModalForm ({ onClose, onSubmit, initialData }: ModalProps) {
    
    // const status =["Soon", "On Progress", "Pending", "Done"]
    const matakuliah =[
        "Kecerdasan Bisnis", 
        "Proyek Pengembangan Perangkat Lunak",
        "Bahasa Inggris Dokumentasi Teknis",
        "Visual Komputer Cerdas",
        "Teknologi Big Data",
        "Bahasa Asing (Jepang)"
    ]

    const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

    const [formData, setFormData] = useState({
        tugas: "",
        matakuliah: "",
        hari: "",
        tanggal: "",
        waktu: "",
        pengumpulan:"",
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

            <div className="relative w-full max-w-lg rounded-lg bg-white p-4 border border-gray-300 shadow-lg animate-modal">
                 
                 <form onSubmit={handleSubmit} className="space-y-4 px-8 py-4">

                    <h1 className="text-center text-lg font-bold mb-4">
                        {initialData? "Edit Tugas" : "Tambah Tugas"}
                    </h1>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Tugas</label>
                        <input 
                            type="text" 
                            placeholder="Tambahkan Tugas" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full px-3 py-3 shadow-xs"
                            value={formData.tugas}
                            onChange={(e) => 
                                setFormData({...formData, tugas: e.target.value})
                            }    
                        />
                    </div>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Matakuliah</label>
                        <select 
                            value={formData.matakuliah}
                            onChange={(e) => 
                                setFormData({...formData, matakuliah: e.target.value})
                            }
                            className="w-full rounded-md border px-2 py-3 text-sm">
                            
                            <option value="" disabled>Pilih Matakuliah</option>

                            {matakuliah.map((matakuliah) => (
                                <option key={matakuliah} value={matakuliah}>
                                    {matakuliah}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Hari (DL)</label>
                        <select 
                            value={formData.hari}
                            onChange={(e) => 
                                setFormData({...formData, hari: e.target.value})
                            }
                            className="w-full rounded-md border p-2 text-sm">

                            <option value="" disabled>Pilih Hari</option>

                            {hari.map((hari) => (
                            <option key={hari} value={hari}>
                                {hari}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Tanggal (DL)</label>
                        <input 
                            type="date" 
                            placeholder="Tambahkan Tugas" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full px-3 py-3 shadow-xs"
                            value={formData.tanggal}
                            onChange={(e) => 
                                setFormData({...formData, tanggal: e.target.value})
                            }    
                        />
                    </div>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Waktu (DL)</label>
                        <input 
                            type="time" 
                            placeholder="Tambahkan Tugas" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full px-3 py-3 shadow-xs"
                            value={formData.waktu}
                            onChange={(e) => 
                                setFormData({...formData, waktu: e.target.value})
                            }    
                        />
                    </div>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Pengumpulan</label>
                        <input 
                            type="text" 
                            placeholder="Tambahkan Pengumpulan"
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full px-3 py-3 shadow-xs"
                            value={formData.pengumpulan}
                            onChange={(e) => 
                                setFormData({...formData, pengumpulan: e.target.value})
                            }    
                        />
                    </div>

                    {/* Kategori */}
                    {/* <div>
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
                    </div> */}

                    {/* Status */}
                    {/* <div>
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
                    </div> */}

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
