import { apiClient } from "@/shared/api/client";
import { TRegisterForm, TResRegisterForm } from "../model/types";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorData } from "@/shared/model/types/ErrorData";

export function registerApi(data: TRegisterForm) {
    return apiClient.post("/signup", data)
        .then((res: AxiosResponse<TResRegisterForm>) => {
            return res.data;
        })
        .catch((ex: AxiosError) => {
            if (ex.response?.status == 400) {
                const error = ex.response.data as ErrorData;
                console.log(error);
                if (error.reason == 'User already in system') {
                    throw new Error('Пользователь уже в системе');
                }
            }
            if (ex.response?.status == 401) {
                throw new Error('Не валидные данные');
            }
            throw new Error('Ошибка сервера'); 
        })
}