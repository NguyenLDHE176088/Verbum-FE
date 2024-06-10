import React from "react";
import { CreateJobScreen } from "@/components/screens/jobs/create";
import { MainLayout } from "@/components/layouts/MainLayout";

const JobPage = () => {
  return (
    <MainLayout>
      <CreateJobScreen />
    </MainLayout>
  );
};

export default JobPage;
