"use client";

export async function getAllUsers() {
  try {
    const response = await fetch("http://localhost:9999/users/", {method: "GET"});

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
      alert(`Error: ${data.message || "An error occurred"}`);
      return { error: data };
    }

    alert("User created successfully!");
    return { success: data };
  } catch (error) {
    alert(`Error: ${error.message || "An error occurred"}`);
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