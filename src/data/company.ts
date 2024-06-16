interface CreateCompany {
    firstName: string;
    lastName: string;
    companyName: string;
    userId: string;
}

export async function createCompany(value: CreateCompany) {
    try {
        const response = await fetch("http://localhost:9999/company", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        const data = await response.json();
        return {success: data};
    } catch (error) {
        alert(`Error: ${error.message || "An error occurred"}`);
        return {error: {message: error.message}};
    }
}