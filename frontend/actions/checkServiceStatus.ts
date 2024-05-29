"use server";

import { CheckStatusResponse } from "@/types/api/CheckStatusResponse";
import { backendName } from "@/utils/backendName";

export const checkServiceStatus = async (): Promise<CheckStatusResponse> => {
    try {
        const response = await fetch(`${backendName}/api/checkService`, {cache: "no-store"});
        return await response.json() as CheckStatusResponse;
    } catch (error) {
        console.error(error);
        return {CheckStatusResult: "Error checking service status."};
    }
};
