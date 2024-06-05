export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};
