'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type NotesContext = {
  updatedNotes: boolean;
  setUpdatedNotes: Dispatch<SetStateAction<boolean>>;
};

const NotesContext = createContext<NotesContext>({} as unknown as NotesContext);

export default NotesContext;

export function NotesContextProvider({ children }: { children: ReactNode }) {
  const [updatedNotes, setUpdatedNotes] = useState(false);

  const context = { updatedNotes, setUpdatedNotes };

  return (
    <NotesContext.Provider value={context}>{children}</NotesContext.Provider>
  );
}
