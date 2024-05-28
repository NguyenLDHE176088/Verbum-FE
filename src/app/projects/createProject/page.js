
import classes from './page.module.css';
import LanguageSelector from '../../../components/project/LanguageSelector.js';
export default function CreateProject() {
    return (
        <>
            <div className={classes.header}>
                <h1>Create project</h1>
            </div>


            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <div className={classes.sidebar}>
                        <p className={classes.activeTitle}>Project Details</p>
                        <p className={classes.inActiveTitle} >Project status automation</p>
                        <p className={classes.inActiveTitle} >Quality Assurance</p>
                    </div>
                    <div className={classes.form}>
                        <form>
                            <div className={classes.formGroup}>
                                <label>Name *</label>
                                <input type="text" name="name" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Source language *</label>
                                <input type="text" name="sourceLanguage" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <LanguageSelector />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Due Date *</label>
                                <input type="date" name="dueDate" className={classes.input} required />
                            </div>
                            <div className={classes.formGroup}>
                                <label>Metadata *</label>
                                <textarea name="metadata" className={classes.textarea} required></textarea>
                            </div>
                            <button type="submit" className={classes.button}>Create project</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

