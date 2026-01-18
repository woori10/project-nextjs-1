import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type Note = {
    id : number;
    tugas: string,
    matakuliah: string,
    hari: string,
    tanggal: string,
    waktu: string,
    pengumpulan: string,
}

export function useNotes () {
    
     const [notes, setNotes] = useState<Note[]>([]);
     const [loading, setLoading] = useState(true);

     const hari_order: Record<string, number> = {
        Senin: 1,
        Selasa: 2,
        Rabu: 3,
        Kamis: 4,
        Jumat: 5,
        Sabtu: 6,
        Minggu: 7,
     }

    

     const fetchNotes = async () => {
        setLoading(true);
        
        const start = Date.now(); 

        const {data, error} = await supabase
            .from("tugas_kuliah")
            .select("*")
            
        
        const elapsed = Date.now() - start;
        const MIN_LOADING_TIME = 500; 

           
        if (elapsed < MIN_LOADING_TIME) {
            await new Promise((res) =>
                setTimeout(res, MIN_LOADING_TIME - elapsed)
            );
        }
        
        if (error) {
            console.error("Fetch Tugas Error: ", error);
            return;
        }

        const mapped: Note[] = data
            .map((item) => ({
                id: item.id_tugas,
                tugas: item.tugas,
                matakuliah: item.matakuliah,
                hari: item.hari,
                tanggal: item.tanggal,
                waktu: item.waktu,
                pengumpulan: item.pengumpulan,
            }))
            .sort((a, b) => {
            const dateA = new Date(a.tanggal).getTime();
            const dateB = new Date(b.tanggal).getTime();

            if (dateA !== dateB) {
            return dateA - dateB; // tanggal terdekat dulu
            }

            // kalau tanggal sama → urutkan jam
            return a.waktu.localeCompare(b.waktu);
            });

        setNotes(mapped);
        setLoading(false);

     };

     useEffect(() => {
        fetchNotes();
    }, []);

     const addNote = async (data: Omit<Note, "id">) => {
        const {error} = await supabase.from("tugas_kuliah").insert({
            tugas: data.tugas,
            matakuliah: data.matakuliah,
            hari: data.hari,
            tanggal: data.tanggal,
            waktu: data.waktu,
            pengumpulan: data.pengumpulan,
        });

        if (error) {
            console.error("Insert Tugas Error : ", error);
            return;
        }

        fetchNotes();
     };

     const updateNote = async (id: number, data: Omit<Note, "id">) => {
        const {error} = await supabase
        .from("tugas_kuliah")
        .update({
            tugas: data.tugas,
            matakuliah: data.matakuliah,
            hari: data.hari,
            tanggal: data.tanggal,
            waktu: data.waktu,
            pengumpulan: data.pengumpulan,
        })
        .eq("id_tugas", id);

        if (error) {
            console.error("Update Tugas Error : ", error);
            return;
        }

        fetchNotes();

     };

     const deleteNote = async (id: number) => {
        const {error} = await supabase
        .from("tugas_kuliah")
        .delete()
        .eq("id_tugas", id);

        if (error) {
            console.error("Delete Tugas Error : ", error);
            return;
        }

        fetchNotes();
     };

    //  useEffect (() => {
    //     const savedNotes = localStorage.getItem("notes");

    //     if (savedNotes) {
    //         setNotes(JSON.parse(savedNotes));
    //     }
    // }, []);

    // useEffect (() => {
    //     localStorage.setItem("notes", JSON.stringify(notes));
    // }, [notes]);


    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
        loading
    };

}