"use client";
import LanguageSelector from './LanguageSelector.js';

function DetailsForm({ detailsForm, handleDetailsChange }) {

    const handleTargetLanguagesChange = (selectedLanguages) => {
        handleDetailsChange({
            target: {
                name: 'targetLanguages',
                value: selectedLanguages
            }
        });
    }
    const handleSourceLanguagesChange = (selectedLanguages) => {
        handleDetailsChange({
            target: {
                name: 'sourceLanguage',
                value: selectedLanguages[0]||""
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
                <LanguageSelector name={"Source Language*"} onLanguagesChange={handleSourceLanguagesChange} allowMultipleChoice={false} />
            </div>
            <div className="mb-[15px]">
                <LanguageSelector name={"Target Language*"} onLanguagesChange={handleTargetLanguagesChange} allowMultipleChoice={true} />
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
