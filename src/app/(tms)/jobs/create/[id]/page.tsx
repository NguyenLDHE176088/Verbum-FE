"use client";
import React from "react";
import { CreateJobScreen } from "@/components/screens/jobs/create";
import { useParams } from "next/navigation";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  return <CreateJobScreen projectId={id} />;
};

export default JobPage;
