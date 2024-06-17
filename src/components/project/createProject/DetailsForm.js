
import TargetLanguageSelector from './TargetLanguageSelector.js';
import classes from './DetailsForm.module.css';
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
            <div className={classes.formGroup}>
                <label>Name *</label>
                <input type="text" name="name" value={detailsForm.name} onChange={handleDetailsChange} className={classes.input} required />
            </div>
            <div className={classes.formGroup}>
                <label>Source language *</label>
                <select
                   
                    name="sourceLanguage"
                    value={detailsForm.sourceLanguage}
                    onChange={handleDetailsChange}
                    className={classes.input}
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

            <div className={classes.formGroup}>
                <TargetLanguageSelector onLanguagesChange={handleLanguagesChange} />
            </div>
            <div className={classes.formGroup}>
                <label>Due Date *</label>
                <input type="date" name="dueDate" value={detailsForm.dueDate} onChange={handleDetailsChange} className={classes.input} required />
            </div>
            <div className={classes.formGroup}>
                <label>Metadata *</label>
                <textarea name="metadata" value={detailsForm.metadata} onChange={handleDetailsChange} className={classes.textarea} required></textarea>
            </div>
        </div>
    );
}

export default DetailsForm;
