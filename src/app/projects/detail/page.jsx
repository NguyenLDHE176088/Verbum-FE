import ProjectInfo from '@/components/project/detail/ProjectInfo'
import { JobTable } from '@/components/project/detail/JobTable';
import { ReferenceTable } from '@/components/project/detail/ReferenceTable';

const getJobData = () => {
    const data = [
        {
            id: 1,
            createdDate: "2024-06-01",
            source: "English",
            target: "Spanish",
            filename: "document1.txt",
            words: 1500,
            provider: "TranslateCo",
            progress: "In progress",
            dueDate: "2024-06-10",
            status: "Pending",
        },
        {
            id: 2,
            createdDate: "2024-05-28",
            source: "French",
            target: "German",
            filename: "document2.docx",
            words: 2000,
            provider: "LingoWorld",
            progress: "Completed",
            dueDate: "2024-06-05",
            status: "Approved",
        },
        {
            id: 3,
            createdDate: "2024-06-02",
            source: "Chinese",
            target: "English",
            filename: "document3.pdf",
            words: 1800,
            provider: "GlobalLingua",
            progress: "In review",
            dueDate: "2024-06-07",
            status: "Pending",
        },
        {
            id: 4,
            createdDate: "2024-05-30",
            source: "Spanish",
            target: "Italian",
            filename: "document4.doc",
            words: 2200,
            provider: "TranslateNow",
            progress: "In progress",
            dueDate: "2024-06-08",
            status: "Pending",
        },
        {
            id: 5,
            createdDate: "2024-06-03",
            source: "German",
            target: "English",
            filename: "document5.txt",
            words: 1700,
            provider: "LanguageExperts",
            progress: "Not started",
            dueDate: "2024-06-15",
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
          createdBy: "Alice",
          createdDate: new Date().toISOString()
        },
        {
          id: 2,  
          name: "Headphones",
          createdBy: "Bob",
          createdDate: "2023-06-05"  // Specific date string
        },
        {
          id: 3,
          name: 'None',  // Name can be missing
          createdBy: "Charlie",
          createdDate: new Date().toString()  // UTC timestamp
        },
        {
          id: 4,  // ID can be float
          name: "Meeting Notes",
          createdBy: ["David", "Emily"],  // Created by as a list
          createdDate: "2024-01-15"  // Date string
        },
        {
          id: 5,
          name: "New Project",
          createdBy: "Frank",
          createdDate: new Date().toISOString(),
          status: "Pending"  // Additional property
        }
      ];
    return data;
}
export default function ProjectDetail() {
    return (
        <>
            <ProjectInfo />
            <JobTable data={getJobData() || []} />
            <ReferenceTable data={getReferenceData()||[]} />
        </>
    )
}