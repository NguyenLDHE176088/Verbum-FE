"use client"
import React, { useState, useEffect, useRef } from "react";

interface Language {
  code: string;
  name: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  type: "source" | "target";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguages,
  setSelectedLanguages,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (code: string) => {
    if (selectedLanguages.includes(code)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== code));
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const isSelected = (code: string) => selectedLanguages.includes(code);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          {selectedLanguages.length > 0
            ? selectedLanguages
                .map(
                  (code) =>
                    languages.find((lang) => lang.code === code)?.code ?? ""
                )
                .join(", ")
            : `Select ${type === "source" ? "Source" : "Target"} Language`}
        </span>
      </div>
      {isOpen && (
        <div className="relative mt-1 w-full max-h-28 border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-y-auto">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`px-4 py-2 cursor-pointer ${
                isSelected(lang.code) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="font-semibold">{lang.code}</span> - {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
