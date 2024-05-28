
'use client'
import React, { useState, useRef } from 'react';

const languages = [
    { code: 'ab', name: 'Abkhaz' },
    { code: 'ace', name: 'Acehnese' },
    { code: 'ace-Arab', name: 'Acehnese (Arabic)' },
    { code: 'ace-Latn', name: 'Acehnese (Latin)' },
    { code: 'ach', name: 'Acholi' },
    { code: 'fub', name: 'Adamawa Fulfulde' },
];

const LanguageSelector = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLanguagesShortCut, setSelectedLanguagesShortCut] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleCheckboxChange = (code) => {
        setSelectedLanguages(
            selectedLanguages.includes(code)
                ? selectedLanguages.filter((lang) => lang !== code)
                : [...selectedLanguages, code]
        );
        setSelectedLanguagesShortCut(
            selectedLanguages.includes(code)
                ? selectedLanguages.filter((lang) => lang !== code).slice(0, 3)
                : [...selectedLanguages, code].slice(0, 3)
        );
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
            <div ref={dropdownRef} style={{ position: 'relative', backgroundColor: 'white', }}>
                <div onClick={toggleDropdown} style={{ border: '1px solid #ccc', padding: '10px', 
                borderRadius: '4px', cursor: 'pointer', display: 'flex' ,alignItems:'center',}}>
                    {selectedLanguagesShortCut.length > 0 ? (
                        <>
                            {
                                selectedLanguagesShortCut.map((code) => (
                                    <div key={code}
                                        onClick={() => handleCheckboxChange(code)}
                                        style={{
                                            padding: '5px', backgroundColor: '#80808057', margin: '0px 5px', borderRadius: '10px',
                                        }}>
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
                    <div style={{ position: 'absolute', width: '100%', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', zIndex: 1 }}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <div style={{margin:'5px 10px',fontSize:'15px',display:'flex',alignItems:'center',width:'40%'}}>
                                Selected Languages 
                                <div style={{padding:'5px',backgroundColor:'#80808057',width:'13%',display:'flex',
                                borderRadius:'50%',justifyContent:'center',margin:'0px 5px'}}>
                                    {selectedLanguages.length}
                                </div>
                            </div>
                            {selectedLanguages.length>0&&(
                                <div onClick={()=>handleClear()}
                                style={{marginRight:'5%',fontWeight:'bold',cursor:'pointer',}}>clear</div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            style={{ width: '95%', padding: '10px', boxSizing: 'border-box',borderRadius:'15px',margin:'5px', }}
                        />
                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {filteredLanguages.map((lang) => (
                                <div key={lang.code} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                    <input
                                        type="checkbox"
                                        id={lang.code}
                                        checked={selectedLanguages.includes(lang.code)}
                                        onChange={() => handleCheckboxChange(lang.code)}
                                    />
                                    <label htmlFor={lang.code} style={{ marginLeft: '8px' }}>{lang.name}</label>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setIsDropdownOpen(false)} style={{ width: '100%', padding: '10px', border: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '0 0 4px 4px', cursor: 'pointer' }}>
                            Apply
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default LanguageSelector;
