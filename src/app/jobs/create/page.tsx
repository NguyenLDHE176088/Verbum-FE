import React from "react";
import dynamic from 'next/dynamic'
import { MainLayout } from "@/components/layouts/MainLayout";
import { CreateJobScreen } from "@/components/screens/jobs/create";

const JobPage = () => {
  return (
    <MainLayout>
      <CreateJobScreen />
    </MainLayout>
  );
};

export default JobPage;
