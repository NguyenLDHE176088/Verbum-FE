"use client"
import classes from './page.module.css';
import DetailsForm from '@/components/project/createProject/DetailsForm';
import QualityForm from '@/components/project/createProject/QualityForm.js';
import TitlePage from '@/components/project/TitlePage';
import StatusForm from '@/components/project/createProject/StatusForm';
import { useState } from 'react';

export default function CreateProject() {
    const [formState, setFormState] = useState('Details');
    const [detailsForm, setDetailsForm] = useState({
        name: '',
        sourceLanguage: '',
        targetLanguages: '',
        dueDate: '',
        metadata: ''
    });
    const [statusForm, setStatusForm] = useState({
        emailed: false,
        accepted: false,
        completed: false,
        delivered: false,
        canceled: false
    });

    const [qualityForm, setQualityForm] = useState({
        emptyTarget: { check: false, instantQA: false, ignore: false },
        extraNumber: { check: false, instantQA: false, ignore: false },
        inconsistentTarget: { check: false, instantQA: false, ignore: false },
        leadingSpace: { check: false, instantQA: false, ignore: false },
        maxSegmentLengthPercent: { check: false, instantQA: false, ignore: false, value: 130 },
        maxTargetSegmentLengthInCharacters: { check: false, instantQA: false, ignore: false, value:1300 },
        missingNumber: { check: false, instantQA: false, ignore: false },
        missingSpaces: { check: false, instantQA: false, ignore: false },
        repeatedWords: { check: false, instantQA: false, ignore: false },
        spelling: { check: false, instantQA: false, ignore: false },
        identicalText: { check: false, instantQA: false, ignore: false },
      });

    const handleOnClickFormState = (state) => {
        setFormState(state);
    };

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setDetailsForm({ ...detailsForm, [name]: value });
    };

    const handleStatusChange = (e) => {
        const { name, checked } = e.target;
        setStatusForm({ ...statusForm, [name]: checked });
    };

    const handleQualityChange = (event) => {
        const { name, checked, type, value } = event.target;
        const [field, subfield] = name.split('.');
        setQualityForm((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            [subfield]: type === 'checkbox' ? checked : value,
          },
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...detailsForm,
            ...statusForm,
            ...qualityForm,

        };
        console.log("Submitting form data: ", formData);
        // Gửi formData tới API hoặc server của bạn tại đây
    };

    return (
        <>
            <TitlePage title="Create project" />

            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <div className={classes.sidebar}>
                        <p onClick={() => handleOnClickFormState('Details')}
                            className={formState === "Details" ? classes.activeTitle : classes.inActiveTitle}>Project Details</p>
                        <p onClick={() => handleOnClickFormState('Status')}
                            className={formState === "Status" ? classes.activeTitle : classes.inActiveTitle}>Project Status Automation</p>
                        <p onClick={() => handleOnClickFormState('Quality')}
                            className={formState === "Quality" ? classes.activeTitle : classes.inActiveTitle}>Quality Assurance</p>
                    </div>
                    <div className={classes.form}>
                        <form onSubmit={handleSubmit}>
                            {formState === "Details" && (
                                <DetailsForm detailsForm={detailsForm} handleDetailsChange={handleDetailsChange} />
                            )}
                            {formState === "Status" && (
                                <StatusForm statusForm={statusForm} handleStatusChange={handleStatusChange} />
                            )}
                            {formState === "Quality" && (
                                <QualityForm qualityForm={qualityForm} handleQualityChange={handleQualityChange} />
                            )}
                            <button type="submit" className={classes.button}>Create project</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


