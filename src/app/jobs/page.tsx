import React from "react";
import { JobsScreen } from "@/components/screens/jobs";
import { MainLayout } from "@/components/layouts/MainLayout";

const JobPage = () => {
  return (
    <MainLayout>
      <JobsScreen />
    </MainLayout>
  );
};

export default JobPage;
