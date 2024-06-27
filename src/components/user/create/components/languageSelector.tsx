"use client";
import { LanguageContext } from "@/context/languageContext";
import React, { useState, useEffect, useRef, useContext } from "react";

interface Language {
  code: string;
  name: string;
}

interface LanguageSelectorProps {
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  type: "source" | "target";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguages,
  setSelectedLanguages,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const languages = useContext(LanguageContext) as Language[];

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

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-3 cursor-pointer"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <span>
          {selectedLanguages.length > 0
            ? selectedLanguages
                .map((code) => languages.find((lang) => lang.code === code)?.code ?? "")
                .join(", ")
            : `Select ${type === "source" ? "Source" : "Target"} Language`}
        </span>
      </div>
      {isOpen && (
        <div
          className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-y-auto"
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              aria-label="Search languages"
            />
          </div>
          <div role="listbox" title="language-list" className="max-h-20 overflow-auto">
            {filteredLanguages.map((lang) => (
              <div
                key={lang.code}
                className={`px-4 py-2 cursor-pointer ${
                  isSelected(lang.code) ? "bg-gray-200" : ""
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
                role="option"
                aria-selected={isSelected(lang.code) ? "true" : "false"}
              >
                <span className="font-semibold">{lang.code}</span> - {lang.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
