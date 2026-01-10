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

     const addSchedule = (data: Omit<Schedule, "id">) => {
        setSchedules ((prev) => [
            ...prev,
            { id: Date.now(), ...data},
        ]);
     };

     const updateSchedule = (id: number, data: Omit<Schedule, "id">) => {
        setSchedules ((prev) => 
            prev.map ((schedules) => 
                schedules.id === id ? {...schedules, ...data } : schedules 
            )
        );
     };

     const deleteNSchedule = (id: number) => {
        setSchedules ((prev) => prev.filter((schedules) => schedules.id !==id));
     };

     useEffect (() => {
        const savedSchedule = localStorage.getItem("schedules");

        if (savedSchedule) {
            setSchedules(JSON.parse(savedSchedule));
        }
    }, []);

    useEffect (() => {
        localStorage.setItem("notes", JSON.stringify(schedules));
    }, [schedules]);

    

    return {
        schedules,
        addSchedule,
        updateSchedule,
        deleteNSchedule
    };

}