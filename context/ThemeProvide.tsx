'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{ mode: string; setMode: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);


export function ThemeProvider({children}:{children:ReactNode}){
  const [mode,setMode] = useState('');

  const handleThemeChange = ()=>{
    if(mode === 'dark'){
      setMode('light');
      document.documentElement.classList.add("light")
    }else{
      setMode('dark');
      document.documentElement.classList.add("dark")
    }
  }

  useEffect(()=>{
    handleThemeChange()
  },[mode])

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