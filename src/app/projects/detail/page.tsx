import ProjectInfo from '@/components/project/detail/ProjectInfo'
import { JobTable } from '@/components/project/detail/Job/JobTable';
import { ReferenceTable } from '@/components/project/detail/Reference/ReferenceTable';

const getJobData = () => {
    const data = [
        {
            id: 1,
            created_date: "2024-06-01",
            source_language: "English",
            target_language: "Spanish",
            filename: "document1.txt",
            project: "",
            words: 1500,
            provider: "TranslateCo",
            progress: "In progress",
            due_date: "2024-06-10",
            status: "Pending",
        },
        {
            id: 2,
            created_date: "2024-05-28",
            source_language: "French",
            target_language: "German",
            filename: "document2.docx",
            project: "",
            words: 2000,
            provider: "LingoWorld",
            progress: "Completed",
            due_date: "2024-06-05",
            status: "Approved",
        },
        {
            id: 3,
            created_date: "2024-06-02",
            source_language: "Chinese",
            target_language: "English",
            filename: "document3.pdf",
            project: "",
            words: 1800,
            provider: "GlobalLingua",
            progress: "In review",
            due_date: "2024-06-07",
            status: "Pending",
        },
        {
            id: 4,
            created_date: "2024-05-30",
            source_language: "Spanish",
            target_language: "Italian",
            filename: "document4.doc",
            project: "",
            words: 2200,
            provider: "TranslateNow",
            progress: "In progress",
            due_date: "2024-06-08",
            status: "Pending",
        },
        {
            id: 5,
            created_date: "2024-06-03",
            source_language: "German",
            target_language: "English",
            filename: "document5.txt",
            project: "",
            words: 1700,
            provider: "LanguageExperts",
            progress: "Not started",
            due_date: "2024-06-15",
            status: "Pending",
        },
    ];
    return data;
}

const getReferenceData = () => {
    const data = [
        {
          id: 1,
          name: "Task A",
          created_by: "Alice",
          created_date: new Date().toISOString()
        },
        {
          id: 2,  
          name: "Headphones",
          created_by: "Bob",
          created_date: "2023-06-05"  // Specific date string
        },
        {
          id: 3,
          name: 'None',  // Name can be missing
          created_by: "Charlie",
          created_date: new Date().toString()  // UTC timestamp
        },
        {
          id: 4,  // ID can be float
          name: "Meeting Notes",
          created_by: ["David", "Emily"],  // Created by as a list
          created_date: "2024-01-15"  // Date string
        },
        {
          id: 5,
          name: "New Project",
          created_by: "Frank",
          created_date: new Date().toISOString(),
          status: "Pending"  // Additional property
        }
      ];
    return data;
}

export default function ProjectDetail() {
    return (
        <>
            <ProjectInfo id={1}/>
            <JobTable data={getJobData() || []} />
            <ReferenceTable data={getReferenceData()||[]} />
        </>
    )
}