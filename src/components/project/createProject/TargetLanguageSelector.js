
'use client'
import React, { useState, useRef,useEffect} from 'react';


const TargetLanguageSelector = ({onLanguagesChange}) => {
    const [languages, setLanguages] = useState([])
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLanguagesShortCut, setSelectedLanguagesShortCut] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(()=>{
        const fetchLanguages = async () => {
            try {
                const response = await fetch('http://localhost:9999/languages/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLanguages(data.languages); 
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLanguages();
    },[]);

    const handleCheckboxChange = (code) => {

        const newSelectedLanguages=selectedLanguages.includes(code)
        ? selectedLanguages.filter((lang) => lang !== code)
        : [...selectedLanguages, code];

        setSelectedLanguages(newSelectedLanguages);
        onLanguagesChange(newSelectedLanguages);
        setSelectedLanguagesShortCut(newSelectedLanguages.slice(0, 3));
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(true);
    };

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleClear=()=>{
        setSelectedLanguages([]);
        setSelectedLanguagesShortCut([]);

    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <label>Target languages</label>
            <div ref={dropdownRef} className="relative bg-white">
                <div onClick={toggleDropdown}
                className="border border-[#ccc] p-[10px] rounded-[4px] cursor-pointer flex items-center"
                >
                    {selectedLanguagesShortCut.length > 0 ? (
                        <>
                            {
                                selectedLanguagesShortCut.map((code) => (
                                    <div key={code}
                                        onClick={() => handleCheckboxChange(code)}
                                       
                                        className="p-[5px] bg-[#F3F3F3] rounded-[10px] mx-[5px]"
                                        >
                                        {languages.find(lang => lang.code === code)?.name}
                                    </div>
                                ))
                            }
                            {selectedLanguages.length > 3 && (
                                <p>+{selectedLanguages.length-3}</p>
                            )}
                        </>
                    ) :
                        (
                            'Select languages'
                        )}
                </div>
                {isDropdownOpen && (
                    <div className="absolute w-full border border-[#ccc] rounded-[4px] bg-white z-[1]">
                        <div 
                        className="flex items-center justify-between ">
                            <div className="flex items-center w-[40%] text-[15px] mx-[5px] my-[10px]">
                                Selected Languages 
                                <div className="p-[5px] bg-[#80808057] w-[13%] flex rounded-[50%]  justify-center mx-[5px]">
                                    {selectedLanguages.length}
                                </div>
                            </div>
                            {selectedLanguages.length>0&&(
                                <div onClick={()=>handleClear()}
                                className="mr-[5%] font-bold cursor-pointer"
                                >clear</div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="w-[95%] p-[10px] box-border rounded-[15px] m-[5px] border border-[black]"

                        />
                        <div className="max-h-[150px] overflow-y-auto">
                            {filteredLanguages.map((lang) => (
                                <div key={lang.code} className="flex items-center p-[10px]">
                                    <input
                                        type="checkbox"
                                        id={lang.code}
                                        checked={selectedLanguages.includes(lang.code)}
                                        onChange={() => handleCheckboxChange(lang.code)}
                                    />
                                    <label htmlFor={lang.code} className="ml-[8px]">{lang.name}</label>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setIsDropdownOpen(false)} 
                        className="w-full p-[10px] border-none bg-[#007bff] text-white rounded-[4px] cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TargetLanguageSelector;
