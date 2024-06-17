"use client"
import classes from './page.module.css';
import DetailsForm from '@/components/project/createProject/DetailsForm';
import QualityForm from '@/components/project/createProject/QualityForm.js';
import TitlePage from '@/components/project/TitlePage';
import StatusForm from '@/components/project/createProject/StatusForm';
import { useState } from 'react';
import { MainLayout } from "@/components/layouts/MainLayout";
import {createProjectFromAPI} from '@/data/projects';
import {getUser} from '@/lib/cookies'




export default function CreateProject() {
    const details = {
        name: '',
        sourceLanguage: '',
        targetLanguages: [],
        dueDate: '',
        metadata: ''
    }

    const status = {
        emailed: false,
        accepted: false,
        completed: false,
        delivered: false,
        canceled: false
    }

    const quality = {
        emptyTarget: { check: false, instantQA: false, ignore: false },
        extraNumber: { check: false, instantQA: false, ignore: false },
        inconsistentTarget: { check: false, instantQA: false, ignore: false },
        leadingSpace: { check: false, instantQA: false, ignore: false },
        maxSegmentLengthPercent: { check: false, instantQA: false, ignore: false, value: 130 },
        maxTargetSegmentLengthInCharacters: { check: false, instantQA: false, ignore: false, value: 1300 },
        missingNumber: { check: false, instantQA: false, ignore: false },
        missingSpaces: { check: false, instantQA: false, ignore: false },
        repeatedWords: { check: false, instantQA: false, ignore: false },
        spelling: { check: false, instantQA: false, ignore: false },
        identicalText: { check: false, instantQA: false, ignore: false },
    }





    const [formState, setFormState] = useState('Details');
    const [success, setSuccess] = useState('');
    const [detailsForm, setDetailsForm] = useState(details);
    const [statusForm, setStatusForm] = useState(status);
    const [qualityForm, setQualityForm] = useState(quality);





    const createProjectData = () => {
        // const user=getUser();
        console.log(user);
        const { name, sourceLanguage, targetLanguages, dueDate, metadata } = detailsForm;
        const { emailed, accepted, completed, delivered, canceled } = statusForm;
        const {
            emptyTarget,
            extraNumber,
            inconsistentTarget,
            leadingSpace,
            maxSegmentLengthPercent,
            maxTargetSegmentLengthInCharacters,
            missingNumber,
            missingSpaces,
            repeatedWords,
            spelling,
            identicalText
        } = qualityForm;


        const markProjectAssigned = emailed ? "emailed" : accepted ? "accepted" : "Not Assigned";
        const markProjectCompleted = completed ? "completed" : delivered ? "delivered" : "Not Completed";
        const markProjectCanceled = canceled;
        const body = {
            name,
            createBy: "clwzs3ckg0000bsenh3so7ypg",
            description: "This is a new project",
            status: "Active",
            onwer: "clwzs3ckg0000bsenh3so7ypg",
            sourceLanguage,
            dueDate: new Date(dueDate).toISOString(),
            clientName: "Client A",
            metadata,
            markProjectAssigned,
            markProjectCompleted,
            markProjectCanceled,
            emptyTargetQA: emptyTarget.check,
            emptyTargetIgnore: emptyTarget.ignore,
            extraNumberInTargetQA: extraNumber.check,
            extraNumberInTargetIgnore: extraNumber.ignore,
            inconsistenInTargetQA: inconsistentTarget.check,
            inconsistenInTargetIgnore: inconsistentTarget.ignore,
            leadingAndTrailingSpaceQA: leadingSpace.check,
            leadingAndTrailingSpaceIgnore: leadingSpace.ignore,
            maxTargetLengthPercentage: maxSegmentLengthPercent.value,
            maxTargetLengthPercentageQA: maxSegmentLengthPercent.check,
            maxTargetLengthPercentageIgnore: maxSegmentLengthPercent.ignore,
            maxTargetLengthCharacter: maxTargetSegmentLengthInCharacters.value,
            maxTargetLengthCharacterQA: maxTargetSegmentLengthInCharacters.check,
            maxTargetLengthCharacterIgnore: maxTargetSegmentLengthInCharacters.ignore,
            missingNumberQA: missingNumber.check,
            missingNumberIgnore: missingNumber.ignore,
            missingSpaceQA: missingSpaces.check,
            missingSpaceIgnore: missingSpaces.ignore,
            repeatedWordQA: repeatedWords.check,
            repeatedWordIgnore: repeatedWords.ignore,
            spellingQA: spelling.check,
            spellingIgnore: spelling.ignore,
            targetTextIdenticalQA: identicalText.check,
            targetTextIdenticalIgnore: identicalText.ignore,
            targetLanguages: targetLanguages
        };

        return body;
    };


    const createProject = async () => {
        const projectData = createProjectData();
        // const result = await createProjectFromAPI(projectData);
        // if (result.success) {
        //     setSuccess('Project created successfully!');
        //     setDetailsForm(details);
        //     setStatusForm(status);
        //     setQualityForm(quality);
        // } else {
        //     console.error('Error deleting projects:', result.error);
        // }
    };



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
        setQualityForm((prevState) => {
            // Tạo một bản sao của đối tượng con đang được cập nhật
            let updatedField = {
                ...prevState[field],
                [subfield]: type === 'checkbox' ? checked : value,
            };

            // Nếu subfield là 'check' và checked là true, cập nhật tất cả các subfield khác thành true
            if (subfield === 'check' && type === 'checkbox') {
                if (checked) {
                    updatedField = Object.keys(updatedField).reduce((acc, key) => {
                        acc[key] = true;
                        return acc;
                    }, {});
                    // Đảm bảo giữ lại giá trị của 'value' nếu nó tồn tại
                    if (prevState[field].hasOwnProperty('value')) {
                        updatedField['value'] = prevState[field]['value'];
                    }
                } else {
                    updatedField = Object.keys(updatedField).reduce((acc, key) => {
                        acc[key] = false;
                        return acc;
                    }, {});
                    // Đảm bảo giữ lại giá trị của 'value' nếu nó tồn tại
                    if (prevState[field].hasOwnProperty('value')) {
                        updatedField['value'] = prevState[field]['value'];
                    }
                }
            }

            return {
                ...prevState,
                [field]: updatedField,
            };
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        createProject();

    };

    return (

        <MainLayout>
            <>
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
                                {success && <p className={classes.successMessage}>{success}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </MainLayout>
    );
}


