"use client";
import { createContext, useEffect, useState } from "react";
import { getAllLanguages } from "@/data/language.js";

export const LanguageContext = createContext([]);

export const LanguageContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      const data = await getAllLanguages();
      setLanguages(data);
    };
    fetchLanguages();
  }, []);
  
  return (
    <LanguageContext.Provider value={languages}>
      {children}
    </LanguageContext.Provider>
  );
};
