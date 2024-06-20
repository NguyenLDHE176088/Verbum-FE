export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roleName: string;
  allowRejectJob: boolean;
  allowManageUsers: boolean;
  allowManageJobs: boolean;
  allowViewAllProjects: boolean;
  allowManageTermBase: boolean;
  status: string;
};
