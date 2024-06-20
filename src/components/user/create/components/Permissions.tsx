
export const Permissions: React.FC<{
  roleName: string;
  allowRejectJob: boolean;
  setAllowRejectJob: React.Dispatch<React.SetStateAction<boolean>>;
  allowManageJobs: boolean;
  setAllowManageJobs: React.Dispatch<React.SetStateAction<boolean>>;
  allowManageUsers: boolean;
  setAllowManageUsers: React.Dispatch<React.SetStateAction<boolean>>;
  allowManageTermBase: boolean;
  setAllowManageTermBase: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  roleName,
  allowRejectJob,
  setAllowRejectJob,
  allowManageJobs,
  setAllowManageJobs,
  allowManageUsers,
  setAllowManageUsers,
  allowManageTermBase,
  setAllowManageTermBase,
}) => {
  return (
    <div>
      <span className="text-md font-semibold">Permissions</span>
      {roleName === "Linguist" && (
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={allowRejectJob}
            onChange={() => setAllowRejectJob(!allowRejectJob)}
          />
          <span>Allow Reject Job</span>
        </label>
      )}
      {roleName === "Project Manager" && (
        <>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allowManageJobs}
              onChange={() => setAllowManageJobs(!allowManageJobs)}
            />
            <span>Allow Manage Jobs</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allowManageUsers}
              onChange={() => setAllowManageUsers(!allowManageUsers)}
            />
            <span>Allow Manage Users</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allowManageTermBase}
              onChange={() => setAllowManageTermBase(!allowManageTermBase)}
            />
            <span>Allow Manage Termbase</span>
          </label>
        </>
      )}
    </div>
  );
};
