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

export async function getProjectFromAPI(id) {
    try {
        const response = await fetch(`http://localhost:9999/projects/${id}`);
        const data = await response.json();
        if (!response.ok) {
            alert(`Error: ${data.message || "An error occurred"}`);
            return { error: data };
        }

        return { success: data };
    } catch (error) {
        alert(`Error: ${error.message || "An error occurred at here"}`);
        return { error: { message: error.message } };
    }
}

export async function createProjectFromAPI(projectData) {
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


export async function getReferencesByProjectId(id) {
    try {
        let data = []
        const response = await fetch(`http://localhost:9999/projects/references/${id}`);
        if (!response.ok) {
            alert(`Error: ${data.message || "An error occurred"}`);
            return { error: data };
        }
        if (response.status == 200) {
            data = await response.json();
        }
        return { success: data };
    } catch (error) {
        alert(`Error: ${error.message || "An error occurred"}`);
        return { error: { message: error.message } };
    }
}

