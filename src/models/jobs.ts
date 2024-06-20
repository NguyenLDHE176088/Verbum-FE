export type Job = {
  id: number;
  name: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  fileExtension: string;
  targetLanguageId: string;
  status: "new" | "in_progress" | "completed" | "overdue" | "canceled";
  documentUrl: string;
};
