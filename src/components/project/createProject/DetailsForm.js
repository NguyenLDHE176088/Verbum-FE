
import LanguageSelector from './LanguageSelector.js';
import classes from './DetailsForm.module.css';

function DetailsForm({ detailsForm, handleDetailsChange }) {
    return (
        <div>
            <div className={classes.formGroup}>
                <label>Name *</label>
                <input type="text" name="name" value={detailsForm.name} onChange={handleDetailsChange} className={classes.input} required />
            </div>
            <div className={classes.formGroup}>
                <label>Source language *</label>
                <input type="text" name="sourceLanguage" value={detailsForm.sourceLanguage} onChange={handleDetailsChange} className={classes.input} required />
            </div>
            <div className={classes.formGroup}>
                <LanguageSelector />
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
