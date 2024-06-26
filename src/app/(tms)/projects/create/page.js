"use client"
import DetailsForm from '@/components/project/createProject/DetailsForm';
import QualityForm from '@/components/project/createProject/QualityForm.js';
import TitlePage from '@/components/project/TitlePage';
import StatusForm from '@/components/project/createProject/StatusForm';
import { useState } from 'react';
import { createProjectFromAPI } from '@/data/projects';
import { getUser } from '@/lib/cookies'
import { useRouter } from 'next/navigation';


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
    const router = useRouter();

    const createProjectData = async () => {
        const user = await getUser();
        const id = user.id;
        console.log(id);

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
            createBy: id,
            description: "This is a new project",
            status: "Active",
            owner: id,
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
            inconsistentInTargetQA: inconsistentTarget.check,
            inconsistentInTargetIgnore: inconsistentTarget.ignore,
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
            targetLanguages: targetLanguages,
            progress: 0
        };

        return body;
    };


    const createProject = async () => {
        const projectData = await createProjectData();
        console.log(projectData);
        const result = await createProjectFromAPI(projectData);
        if (result.success) {
            setSuccess('Project created successfully!');
            setDetailsForm(details);
            setStatusForm(status);
            setQualityForm(quality);
            router.push('/projects');
        } else {
            console.error('Error deleting projects:', result.error);
        }
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
        <>
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-row overflow-hidden w-[95%]" >
                    <div className="p-4 rounded-lg border-black border-solid border w-[40%]" >
                        <p
                            onClick={() => handleOnClickFormState('Details')}
                            className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Details" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                        >
                            Project Details
                        </p>
                        <p
                            onClick={() => handleOnClickFormState('Status')}
                            className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Status" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                        >
                            Project Status Automation
                        </p>
                        <p
                            onClick={() => handleOnClickFormState('Quality')}
                            className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Quality" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                        >
                            Quality Assurance
                        </p>
                    </div>
                    <div className="ml-[5%] rounded-[10px] border border-black flex-1 p-[20px]">
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
                            <button type="submit" className="px-5 py-2 bg-black text-white border-none rounded cursor-pointer">Create project</button>
                            {success && <p className="text-red-500 mt-2">{success}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


