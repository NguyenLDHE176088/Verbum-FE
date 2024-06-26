"use client";
import React from "react";
import ProjectInfo from "@/components/project/detail/ProjectInfo";
import { JobTable } from "@/components/project/detail/Job/JobTable";
import { ReferenceTable } from "@/components/project/detail/Reference/ReferenceTable";
import { useParams, useRouter } from "next/navigation";
import { getJobsByProjectId } from "@/data/job";
import { Job } from "@/models/jobs";
import { getReferencesByProjectId } from "@/data/projects";
import { Reference } from "@/models/Reference";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = React.useState<Job[]>([]);
  const [reference, setReference] = React.useState<Reference[]>([]);

  React.useEffect(() => {
    const fetchJobData = async () => {
      const result = await getJobsByProjectId(+id);
      if (result.success) {
        setJob(result.success);
      }
    };
    const fetchReferenceData = async () => {
      const result = await getReferencesByProjectId(+id);
      if (result.success) {
        setReference(result.success);
      }
    };

    Promise.resolve(fetchJobData())
      .then(() => fetchReferenceData())
      .catch((e) => {
        alert(e.message);
      });
  }, [id]);

  return (
    <>
      <ProjectInfo id={id} />
      <JobTable data={job} projectId={id} />
      <ReferenceTable data={reference} />
    </>
  );
}
