"use client";

import React, { useState, useEffect } from "react";
import { Language } from "@/models/languages";
import { Form } from "@/components/user/create/components/form";

const CreateUser: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // Fetch languages from your API endpoint
    const fetchLanguages = async () => {
      try {
        const response = await fetch("http://localhost:9999/languages/all");
        if (!response.ok) {
          throw new Error("Failed to fetch languages");
        }
        const data = await response.json();
        setLanguages(data.languages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return <Form languages={languages} setLanguages={setLanguages} />;
};

export default CreateUser;
