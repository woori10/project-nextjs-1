import { AnimatePresence, motion } from "framer-motion";

type ConfirmDeleteModalProps ={
    show : boolean;
    onClose : () => void;
    onConfirm : () => void;
    message : string;
    title : string;
}

export default function ConfirmModal ({ show, onClose, onConfirm, message, title}: ConfirmDeleteModalProps) {
    return(
        <AnimatePresence>
            {show && (
                <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                <motion.div
                    className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >
                    <h2 className="text-md font-semibold text-gray-800 mb-3">
                    {title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                    {message}
                    </p>

                    <div className="flex justify-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 text-sm bg-gray-100 rounded hover:bg-gray-200 transition"
                    >
                        Batal
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-sm text-white rounded hover:bg-red-700 transition"
                    >
                        Ya, Selesai
                    </motion.button>
                    </div>
                </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}