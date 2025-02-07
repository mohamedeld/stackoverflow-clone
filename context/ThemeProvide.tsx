'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{ mode: string; setMode: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);


export function ThemeProvider({children}:{children:ReactNode}){
  const [mode, setMode] = useState(() => {
    // Retrieve the current mode from localStorage or default to 'light'
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    // Set the document class based on the mode
    document.documentElement.classList.toggle("dark", mode === 'dark');
    document.documentElement.classList.toggle("light", mode === 'light');
    
    // Store the mode in localStorage
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{
      mode,setMode
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){
  const context = useContext(ThemeContext);
  if(context === undefined){
    throw new Error("useTheme must be used within theme provide");
  }
  return context;
}