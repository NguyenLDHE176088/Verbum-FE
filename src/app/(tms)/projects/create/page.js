"use client"
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { createProjectFromAPI } from '@/data/projects';
import { getUser } from '@/lib/cookies'
import { useRouter } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';


const DynamicDetailsForm = dynamic(() => import('@/components/project/createProject/DetailsForm'));
const DynamicQualityForm = dynamic(() => import('@/components/project/createProject/QualityForm.js'));
const DynamicStatusForm = dynamic(() => import('@/components/project/createProject/StatusForm'));

export default function CreateProject() {
    const details = {
        name: '',
        sourceLanguage: '',
        targetLanguages: [],
        dueDate: '',
        metadata: '',
        clientName: '',
        clientEmail: '',
        allowCreateGuestAccount: false
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
    const [errorMessages, setErrorMessages] = useState([]);
    const router = useRouter();

    const createProjectData = async () => {
        const user = await getUser();
        const id = user.id;

        const { name, sourceLanguage, targetLanguages, dueDate, metadata,clientName,clientEmail,allowCreateGuestAccount } = detailsForm;

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

        let body = {}

        try {
            body = {
                name,
                createBy: id,
                description: "This is a new project",
                status: "Active",
                owner: id,
                sourceLanguage,
                dueDate: new Date(dueDate).toISOString(),
                clientName,
                clientEmail,
                allowCreateGuestAccount,
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
        } catch (error) {
            const newErrorMessages = [error.message, errorMessages];
            setErrorMessages(newErrorMessages.flat());
        }
        return body;
    };

    const projectDataValidation = (data) => {
        let errors = [];

        if (!data.name || data.name.trim() === "") {
            errors.push("Project name is required");
        }

        if (!data.sourceLanguage || data.sourceLanguage.trim() === "") {
            errors.push("Source Language is required");
        }

        if (!data.targetLanguages || data.targetLanguages.length == 0) {
            errors.push("Target Languages is required");
        }

        if (!data.clientName || data.clientName.trim() === "") {
            errors.push("Target Languages is required");
        }
        // Additional validations can be added here
    
        setErrorMessages(errors);
    }

    const createProject = async () => {
        const projectData = await createProjectData();
        projectDataValidation(projectData);
        if (errorMessages.length == 0) {
            const result = await createProjectFromAPI(projectData);
            if (result.success) {
                setSuccess('Project created successfully!');
                setDetailsForm(details);
                setStatusForm(status);
                setQualityForm(quality);
                router.push('/projects');
            } else {
                setErrorMessages('Can not create new project!');
                console.error('Error create projects:', result.error);
            }
        };
    }



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
        setErrorMessages([]);
        e.preventDefault();
        Promise.resolve(createProject());
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-row overflow-hidden w-[95%]" >
                <div className="p-4 rounded-lg border-black border-solid border w-[40%]" >
                    <p
                        role="presentation"
                        onClick={() => handleOnClickFormState('Details')}
                        className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Details" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                    >
                        Project Details
                    </p>
                    <p
                        role="presentation"
                        onClick={() => handleOnClickFormState('Status')}
                        className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Status" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                    >
                        Project Status Automation
                    </p>
                    <p
                        role="presentation"
                        onClick={() => handleOnClickFormState('Quality')}
                        className={`cursor-pointer mb-[10px] p-[10px] ${formState === "Quality" ? 'font-bold rounded-[20px] border border-[#00BFA6]' : ''}`}
                    >
                        Quality Assurance
                    </p>
                </div>
                <div className="ml-[5%] rounded-[10px] border border-black flex-1 p-[20px]">
                    <form onSubmit={handleSubmit}>
                        {formState === "Details" &&
                            <>
                                <DynamicDetailsForm detailsForm={detailsForm} handleDetailsChange={handleDetailsChange} />
                                <button onClick={() => handleOnClickFormState('Status')} className="px-5 py-2 bg-black text-white border-none rounded cursor-pointer">Next</button>
                            </>
                        }
                        {formState === "Status" &&
                            <>
                                <DynamicStatusForm statusForm={statusForm} handleStatusChange={handleStatusChange} />
                                <button onClick={() => handleOnClickFormState('Quality')} className="px-5 py-2 bg-black text-white border-none rounded cursor-pointer">Next</button>
                            </>
                        }
                        {formState === "Quality" &&
                            <>
                                <DynamicQualityForm qualityForm={qualityForm} handleQualityChange={handleQualityChange} />
                                <button type="submit" className="px-5 py-2 bg-black text-white border-none rounded cursor-pointer">Create project</button>
                            </>
                        }
                        {success && <p className="text-red-500 mt-2">{success}</p>}
                        {
                            errorMessages.length > 0 ?
                                (<div className='bg-destructive/15 items-center text-destructive flex flex-row gap-2 p-3 rounded mt-2'>
                                    <TriangleAlert />
                                    <p>{errorMessages.toString()}</p>
                                </div>)
                                :
                                (<></>)
                        }
                    </form>
                </div>
            </div>
        </div >
    );
}


