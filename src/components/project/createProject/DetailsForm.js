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
                value: selectedLanguages[0] || ""
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
                <LanguageSelector name={"Source Language*"} onLanguagesChange={handleSourceLanguagesChange} allowMultipleChoice={false} required />
            </div>
            <div className="mb-[15px]">
                <LanguageSelector name={"Target Language*"} onLanguagesChange={handleTargetLanguagesChange} allowMultipleChoice={true} required />
            </div>

            <div className="mb-[15px]">
                <label>Client name*</label>
                <input type="text" name="clientName" value={detailsForm.clientName} onChange={handleDetailsChange}
                    className="w-full p-[10px] border border-[#ddd] rounded"
                    required />
            </div>
            <div className="mb-[15px]">
                <label>Client email*</label>
                <input type="text" name="clientEmail" value={detailsForm.clientEmail} onChange={handleDetailsChange}
                    className="w-full p-[10px] border border-[#ddd] rounded"
                    required />
            </div>
            {(detailsForm.clientEmail && detailsForm.clientEmail.trim() !== "") &&
                <div className="mb-[15px]">
                    <span>Create a guest account for client</span>
                    <input type="checkbox" name="allowCreateGuestAccount" value={detailsForm.allowCreateGuestAccount} onChange={handleDetailsChange}
                        className=" p-[10px] border border-[#ddd] rounded ml-5 w-4 h-4"
                        required />
                </div>
            }
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
