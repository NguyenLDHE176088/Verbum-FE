"use client";

import { getUserIdFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getUsers() {
  try {
    const userId = await getUserIdFromCookie();

    const response = await fetch(
      `http://localhost:9999/users/?userId=${userId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    return { success: data };
  } catch (error) {
    alert(`Error: ${error.message || "An error occurred"}`);
    return { error: { message: error.message } };
  }
}

export async function createUser(body: any) {
  try {
    const response = await fetch("http://localhost:9999/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error at create user: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    alert("User created successfully!");
    return { success: data };
  } catch (error) {
    alert(`Error at create user: ${error.message || "An error occurred"}`);
    return { error: { message: error.message } };
  }
}

export async function deleteUser(id: string[]) {
  try {
    const response = await fetch(`http://localhost:9999/users/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    alert("User deleted successfully!");
    return { success: data };
  } catch (error) {
    alert(`Error: ${error.message || "An error occurred"}`);
    return { error: { message: error.message } };
  }
}

export async function getUser(id: string) {
  try {
    const response = await fetch(`http://localhost:9999/users/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    return { success: data };
  } catch (error) {
    alert(`Error: ${error.message || "An error occurred"}`);
    return { error: { message: error.message } };
  }
}

export async function updateUser(id: string, body: any) {
  try {
    const response = await fetch(`http://localhost:9999/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    alert("User updated successfully!");
    return { success: data };
  } catch (error) {
    alert(`Error: ${error.message || "An error occurred"}`);
    return { error: { message: error.message } };
  }
}

export const fetchUsersBySourceAndTargetLanguage = async (
  companyId: string,
  sourceLanguageCode: string,
  targetLanguageCode: string
) => {
  try {
    const response = await fetch(
      `http://localhost:9999/jobs/find-by-source-target-language?companyId=${companyId}&sourceLanguageCode=${sourceLanguageCode}&targetLanguageCode=${targetLanguageCode}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch target languages");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching target languages:", error);
  }
};
