"use client";

import React from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Form } from "@/components/user/create/components/form";

const CreateUser: React.FC = () => {
  return (
    <MainLayout>
      <Form />
    </MainLayout>
  );
};

export default CreateUser;
