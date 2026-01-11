import { useEffect, useState } from "react";

export type Note = {
    id : number;
    tugas: string,
    matakuliah: string,
    hari: string,
    waktu: string,
    pengumpulan: string,
}

export function useNotes () {
    
     const [notes, setNotes] = useState<Note[]>([]);

     const addNote = (data: Omit<Note, "id">) => {
        setNotes ((prev) => [
            ...prev,
            { id: Date.now(), ...data},
        ]);
     };

     const updateNote = (id: number, data: Omit<Note, "id">) => {
        setNotes ((prev) => 
            prev.map ((note) => 
                note.id === id ? {...note, ...data } : note 
            )
        );
     };

     const deleteNote = (id: number) => {
        setNotes ((prev) => prev.filter((note) => note.id !==id));
     };

     useEffect (() => {
        const savedNotes = localStorage.getItem("notes");

        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    useEffect (() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    

    return {
        notes,
        addNote,
        updateNote,
        deleteNote
    };

}