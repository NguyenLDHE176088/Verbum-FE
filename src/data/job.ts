"use client"

export async function getJobsByProjectId(id: number) {
    try {
        const response = await fetch(`http://localhost:9999/jobs/${id}`);
        if (response.status == 204) {
            return  { success: [] };
        } else {
            const data = await response.json();
            return { success: data };
        }
    } catch (error) {
        alert(`Error: ${error.message || "An error occurred"}`);
        return { error: { message: error.message } };
    }
}
