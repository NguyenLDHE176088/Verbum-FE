
export const getAllLanguages = async () => {
    try {
        const response = await fetch("http://localhost:9999/languages/all");
        if (!response.ok) {
            throw new Error("Failed to fetch languages");
        }
        const data = await response.json();
        return Array.isArray(data.languages) ? data.languages : [];
    } catch (error) {
        console.error("Error fetching languages:", error);
    }
};