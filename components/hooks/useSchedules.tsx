import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type Schedule = {
    id : number;
    matakuliah : string;
    ruangan : string;
    mulai : string;
    selesai : string;
    hari : string;
    kelas : string;
}

export function useSchedules () {
    
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    const hari_order: Record<string, number> = {
        Senin: 1,
        Selasa: 2,
        Rabu: 3,
        Kamis: 4,
        Jumat: 5,
    }

    const fetchSchedules = async () => {
        setLoading(true);

        const start = Date.now(); 

        const { data, error } = await supabase
            .from("jadwal_kuliah")
            .select("*")
            .order("hari", { ascending: true })
            .order("pukul_mulai", { ascending: true });

        const elapsed = Date.now() - start;
        const MIN_LOADING_TIME = 500; 

           
        if (elapsed < MIN_LOADING_TIME) {
            await new Promise((res) =>
                setTimeout(res, MIN_LOADING_TIME - elapsed)
            );
        }

        if (error) {
            console.error("Fetch Jadwal error:", error);
            setLoading(false); 
            return;
        }

        const mapped: Schedule[] = data
            .map((item) => ({
                id: item.id_jadwal,
                matakuliah: item.mata_kuliah,
                ruangan: item.ruangan,
                mulai: item.pukul_mulai,
                selesai: item.pukul_selesai,
                hari: item.hari,
                kelas: item.kelas,
            }))
            .sort((a, b) => {
                return hari_order[a.hari] - hari_order[b.hari];
            });

        setSchedules(mapped);
        setLoading(false); 
    };


    useEffect(() => {
        fetchSchedules();
    }, []);

     const addSchedule = async (data: Omit<Schedule, "id">) => {
        const {error} = await supabase.from("jadwal_kuliah").insert({
            mata_kuliah: data.matakuliah,
            ruangan: data.ruangan,
            pukul_mulai: data.mulai,
            pukul_selesai: data.selesai,
            hari: data.hari,
            kelas: data.kelas,
        });

        if (error) {
            console.error("Insert Jadwal Error : ", error);
            return;
        }

        fetchSchedules();
     };

     const updateSchedule = async (id: number, data: Omit<Schedule, "id">) => {
        const {error} = await supabase
        .from("jadwal_kuliah")
        .update({
            mata_kuliah: data.matakuliah,
            ruangan: data.ruangan,
            pukul_mulai: data.mulai,
            pukul_selesai: data.selesai,
            hari: data.hari,
            kelas: data.kelas,
        })
        .eq("id_jadwal", id);

        if (error) {
            console.error("Update Jadwal Error : ", error);
            return;
        }

        fetchSchedules();
     };

     const deleteSchedule = async (id: number) => {
        const {error} = await supabase
        .from("jadwal_kuliah")
        .delete()
        .eq("id_jadwal", id);

        if (error) {
            console.error("Delete Jadwal Error : ", error);
            return;
        }

        fetchSchedules();
     };

    // useEffect (() => {
    //     const savedSchedule = localStorage.getItem("schedules");

    //     if (savedSchedule) {
    //         setSchedules(JSON.parse(savedSchedule));
    //     }
    // }, []);

    // useEffect (() => {
    //     localStorage.setItem("notes", JSON.stringify(schedules));
    // }, [schedules]);

    

    return {
        schedules,
        loading,
        addSchedule,
        updateSchedule,
        deleteSchedule
    };

}