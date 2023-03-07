'use client';
import type { Note } from '@prisma/client';
import React, { useEffect, useState, useContext } from 'react';
import NotesContext from './context/NotesContext';
import MaterialIcon, {colorPalette} from 'material-icons-react';

type Props = {
  initialNotes: Note[];
};

function Notes({ initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const { updatedNotes, setUpdatedNotes } = useContext(NotesContext);

  async function fetchNotes() {
    const res = await fetch('/api/note');
    if (res.ok) {
      setNotes(await res.json());
      setUpdatedNotes(false);
    }
  }

  useEffect(() => {
    if (updatedNotes) fetchNotes();
  }, [updatedNotes]);

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
      {notes.map((note, idx) =>
        <NoteCard key={idx} {...{note,setUpdatedNotes}}/>
      )}
    </div>
  );
}

export default Notes;

function NoteCard({note, setUpdatedNotes}) {
  const [moreOpen, setMoreOpen] = useState(false);

  async function deleteNote() {
    const res = await fetch('/api/note', {
      method: 'DELETE',
      body: JSON.stringify({ id: note.id })
    });

    if (res.ok) setUpdatedNotes(true);

    setMoreOpen(false);
  }

  return <div
    className="rounded-xl border border-neutral-700 px-4 py-2.5"
  >
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <div className="relative">
        <div onClick={() => setMoreOpen(s => !s)}>
          <MaterialIcon icon="more_horiz" color="#bbb"/>
        </div>

        {moreOpen && <div className="absolute z-[1] bg-neutral-800 top-4 right-0 p-1 pr-1.5 rounded-lg
          after:absolute after:h-2 after:w-2 after:bg-neutral-800 after:-top-1 after:right-2 after:z-[-10] after:rounded-[2px] after:rotate-45">
          <button className="flex space-x-2 items-center" onClick={deleteNote}>
            <MaterialIcon icon="delete" color="#bbb"/>
            <span>delete</span>
          </button>
        </div>}
      </div>
    </div>

    <div className="mb-2 border-t border-neutral-600" />
    <p className="text-white/80 line-clamp-4">{note.content}</p>
  </div>
}
