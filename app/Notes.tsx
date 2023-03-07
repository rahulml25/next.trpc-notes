'use client';
import type { Note } from '@prisma/client';
import React, { useEffect, useState, useContext } from 'react';
import NotesContext from './context/NotesContext';

type Props = {
  initialNotes: Note[];
};

function Notes({ initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const { updatedNotes } = useContext(NotesContext);

  async function fetNotes() {
    const res = await fetch('/api/note');
    if (res.ok) setNotes(await res.json());
  }

  useEffect(() => {
    if (updatedNotes) fetNotes();
  }, [updatedNotes]);

  return (
    <div className="mt-6 grid grid-cols-3 gap-x-2 gap-y-4">
      {notes.map(
        (note, idx) => (
          <div
            className="rounded-xl border border-neutral-700 px-4 py-2.5"
            key={idx}
          >
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <div className="mb-2 border-t border-neutral-600" />
            <p className="text-white/80 line-clamp-4">{note.content}</p>
          </div>
        )
      )}
    </div>
  );
}

export default Notes;
