import { apiClient } from "@/shared/api/client";
import { AxiosError, AxiosResponse } from "axios";

export function logoutApi() {
    return apiClient.post("/logout")
        .then((res: AxiosResponse) => {
            console.log(res)
        })
}