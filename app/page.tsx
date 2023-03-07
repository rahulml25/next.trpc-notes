import prisma from '@/prisma';
import { NotesContextProvider } from './context/NotesContext';
import NewNote from './NewNote';
import Notes from './Notes';

async function getNotes() {
  return prisma.note.findMany({});
}

export default async function Home() {
  const initialNotes = await getNotes();

  return (
    <main className="px-3">
      <NotesContextProvider>
        <NewNote />
        <Notes {...{ initialNotes }} />
      </NotesContextProvider>
    </main>
  );
}
