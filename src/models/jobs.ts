export type Job = {
    id: string;
    created_date: string;
    source_language: string;
    target_language: string;
    filename: string;
    project: string;
    words: number;
    provider: string;
    progress: number;
    due_date: string;
    status: "new" | "in_progress" | "completed" | "overdue" | "canceled";
  };