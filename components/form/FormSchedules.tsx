"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CancelButton from "../button/CancelButton";
import TernaryButton from "../button/TernaryButton";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
};

export default function ScheduleModalForm({
  show,
  onClose,
  onSubmit,
  initialData,
}: ModalProps) {

  const kelas = ["Kuliah", "Praktikum", "Responsi"];
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  const [formData, setFormData] = useState({
    matakuliah: "",
    hari: "",
    mulai: "",
    selesai: "",
    ruangan: "",
    kelas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // lock scroll saat modal buka
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[90%] sm:w-[85%] md:w-full max-w-lg rounded-lg bg-white p-4 border max-h-[90vh] overflow-y-auto border-gray-300 shadow-lg"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ================= FORM ASLI KAMU ================= */}
            <form onSubmit={handleSubmit} className="space-y-4 px-8 py-4">

              <h1 className="text-center text-lg font-bold mb-4">
                {initialData ? "Edit Jadwal" : "Tambah Jadwal"}
              </h1>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Matakuliah
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Matakuliah"
                  className="block text-sm text-gray-600 border border-default-medium font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                  value={formData.matakuliah}
                  onChange={(e) =>
                    setFormData({ ...formData, matakuliah: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Ruangan
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Ruangan"
                  className="block text-sm border border-default-medium text-gray-600 font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                  value={formData.ruangan}
                  onChange={(e) =>
                    setFormData({ ...formData, ruangan: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Mulai
                </label>
                <input
                  type="time"
                  className="block text-sm border border-default-medium text-gray-600 font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                  value={formData.mulai}
                  onChange={(e) =>
                    setFormData({ ...formData, mulai: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Selesai
                </label>
                <input
                  type="time"
                  className="block text-sm border border-default-medium text-gray-600 font-medium rounded rounded-base focus:border-brand w-full p-2 shadow-xs"
                  value={formData.selesai}
                  onChange={(e) =>
                    setFormData({ ...formData, selesai: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Hari
                </label>
                <select
                  value={formData.hari}
                  onChange={(e) =>
                    setFormData({ ...formData, hari: e.target.value })
                  }
                  className="w-full rounded-md border px-2 py-3 text-sm text-gray-600"
                >
                  <option value="" disabled>
                    Pilih Hari
                  </option>
                  {hari.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-3 text-sm font-medium text-gray-800">
                  Kelas
                </label>
                <select
                  value={formData.kelas}
                  onChange={(e) =>
                    setFormData({ ...formData, kelas: e.target.value })
                  }
                  className="w-full rounded-md border px-2 py-3 text-sm text-gray-600"
                >
                  <option value="" disabled>
                    Pilih Jenis Kelas
                  </option>
                  {kelas.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <CancelButton type="button" className="mt-4 text-xs" onClick={onClose}>
                  Batal
                </CancelButton>
                <TernaryButton type="submit" className="mt-4 text-xs">
                  {initialData ? "Simpan" : "Tambah"}
                </TernaryButton>
              </div>
            </form>
            {/* ================================================= */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
