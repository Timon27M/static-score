import { apiClient } from "@/shared/api/client";
import { TLoginForm, TResLoginForm } from "../model/types";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorData } from "@/shared/model/types/ErrorData";

export function authApi(data: TLoginForm) {
    return apiClient.post("/signin", data)
        .then((res: AxiosResponse<TResLoginForm>) => {
            return res.data;
        })
        .catch((ex: AxiosError) => {
            if (ex.response?.status == 400) {
                const error = ex.response.data as ErrorData;
                if (error.reason == 'User already in system') {
                    throw new Error('Пользователь уже в системе');
                }
            }
            if (ex.response?.status == 401) {
                throw new Error('Неверный логин или пароль');
            }
            throw new Error('Ошибка сервера'); 
        })
}
