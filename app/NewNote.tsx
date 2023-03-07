'use client';

import React, { useContext, useRef } from 'react';
import NotesContext from './context/NotesContext';

function NewNote() {
  const { setUpdatedNotes } = useContext(NotesContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  async function createNewNote(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    e.preventDefault();

    if (!(titleRef.current && contentRef.current)) return;

    const note = {
      title: titleRef.current?.value!,
      content: contentRef.current?.value!,
    };

    const res = await fetch('/api/note', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (res.ok) setUpdatedNotes(true);

    titleRef.current.value = '';
    contentRef.current.value = '';
  }

  return (
    <form
      onSubmit={createNewNote}
      className="my-3 flex max-w-md flex-col space-y-2 rounded-xl bg-neutral-900 px-3 py-2"
    >
      <h1 className="text-xl font-bold">Create a Note</h1>
      <input
        type="text"
        placeholder="Title"
        ref={titleRef}
        className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-0.5 font-bold outline-none"
        required
      />
      <textarea
        placeholder="content..."
        ref={contentRef}
        className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-0.5 outline-none"
        required
      />
      <button className="mx-auto w-fit rounded-xl bg-neutral-800 px-4 py-1">
        Save
      </button>
    </form>
  );
}

export default NewNote;
