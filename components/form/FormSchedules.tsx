"use client";
import { useEffect, useState } from "react";
import TernaryButton from "../button/TernaryButton";

type ModalProps ={
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
};

export default function ScheduleModalForm ({ onClose, onSubmit, initialData }: ModalProps) {
    
    const kelas =["Kuliah", "Praktikum", "Responsi"]
    const hari =["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

    const [formData, setFormData] = useState({
        matakuliah: "",
        hari:"",
        mulai: "",
        selesai: "",
        ruangan:"",
        kelas: "",
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
        <div className="fixed inset-0 z-50 flex justify-center items-center">

            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            />

            <div className="relative w-full max-w-lg rounded-lg bg-white p-4 border border-gray-300 shadow-lg animate-modal">
                 
                 <form onSubmit={handleSubmit} className="space-y-4 px-8 py-4">

                    <h1 className="text-center text-lg font-bold mb-4">
                        {initialData? "Edit Jadwal" : "Tambah Jadwal"}
                    </h1>

                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Matakuliah</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan Matakuliah" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                            value={formData.matakuliah}
                            onChange={(e) => 
                                setFormData({...formData, matakuliah: e.target.value})
                            }    
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Ruangan</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan Ruangan" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                            value={formData.ruangan}
                            onChange={(e) => 
                                setFormData({...formData, ruangan: e.target.value})
                            }    
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Mulai</label>
                        <input 
                            type="time" 
                            placeholder="Masukkan Jam" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                            value={formData.mulai}
                            onChange={(e) => 
                                setFormData({...formData, mulai: e.target.value})
                            }    
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Selesai</label>
                        <input 
                            type="time" 
                            placeholder="Masukkan Jam" 
                            className="block text-sm border border-default-medium text-heading font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                            value={formData.selesai}
                            onChange={(e) => 
                                setFormData({...formData, selesai: e.target.value})
                            }    
                        />
                    </div>
                    <div>
                        <label className="block mb-3 text-sm font-semibold text-heading">Hari</label>
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
                        <label className="block mb-3 text-sm font-semibold text-heading">Kelas</label>
                        <select 
                            value={formData.kelas}
                            onChange={(e) => 
                                setFormData({...formData, kelas: e.target.value})
                            }
                            className="w-full rounded-md border p-2 text-sm">

                            <option value="" disabled>Pilih Jenis Kelas</option>

                            {kelas.map((kelas) => (
                            <option key={kelas} value={kelas}>
                                {kelas}
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
