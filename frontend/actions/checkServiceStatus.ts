"use server";

export const checkServiceStatus = async () => {
    const response = await fetch(`http://localhost:3001/api/checkService`, {cache: "no-store"});
    const data = await response.json();
    return data;
};
