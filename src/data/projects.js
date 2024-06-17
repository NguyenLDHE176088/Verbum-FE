"use client";

export async function getAllProjects() {
    try {
        const response = await fetch('http://localhost:9999/projects');
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

export async function createProjectFromAPI(projectData) {
    console.log(projectData);
    try {
        const response = await fetch('http://localhost:9999/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
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


export async function deleteProjectsFromAPI(ids) {
    try {
        const response = await fetch('http://localhost:9999/projects', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids })
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
