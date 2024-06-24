"use client";
import React from "react";
import dynamic from "next/dynamic";
import { MainLayout } from "@/components/layouts/MainLayout";
import { CreateJobScreen } from "@/components/screens/jobs/create";
import { useParams } from "next/navigation";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <MainLayout>
      <CreateJobScreen projectId={id} />
    </MainLayout>
  );
};

export default JobPage;