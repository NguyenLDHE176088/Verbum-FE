
import TargetLanguageSelector from './TargetLanguageSelector.js';
import { useState, useEffect } from 'react';

function DetailsForm({ detailsForm, handleDetailsChange }) {
    const [languages, setLanguages] = useState([]);


    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch('http://localhost:9999/languages/all');
                const data = await response.json();
                setLanguages(data.languages);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();
    }, []);


    const handleLanguagesChange = (selectedLanguages) => {
        handleDetailsChange({
            target: {
                name: 'targetLanguages',
                value: selectedLanguages
            }
        });
    }
    return (
        <div>
            <div className="mb-[15px]">
                <label>Name *</label>
                <input type="text" name="name" value={detailsForm.name} onChange={handleDetailsChange}
                 className="w-full p-[10px] border border-[#ddd] rounded"
                  required />
            </div>
            <div className="mb-[15px]">
                <label>Source language *</label>
                <select
                   
                    name="sourceLanguage"
                    value={detailsForm.sourceLanguage}
                    onChange={handleDetailsChange}
                    className="w-full p-[10px] border border-[#ddd] rounded"
                    required  
                >
                    <option  value="" disabled hidden>Select a language</option>
                    {languages.map(language => (
                        <option key={`${language.id}-${language.code}`} value={language.code}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-[15px]">
                <TargetLanguageSelector onLanguagesChange={handleLanguagesChange} />
            </div>
            <div className="mb-[15px]">
                <label>Due Date *</label>
                <input type="date" name="dueDate" value={detailsForm.dueDate} onChange={handleDetailsChange} 
                className="w-full p-[10px] border border-[#ddd] rounded"
                 required />
            </div>
            <div className="mb-[15px]">
                <label>Metadata *</label>
                <textarea name="metadata" value={detailsForm.metadata} onChange={handleDetailsChange} 
                 className="w-full p-[10px] border border-[#ddd] rounded h-[100px] rounded-2"
                required></textarea>
            </div>
        </div>
    );
}

export default DetailsForm;
