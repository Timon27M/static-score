import { apiClient } from "@/shared/api/client";

export function getUser() {
   return apiClient.get('/user').then((res) => {
    console.log(res)
    if (res.status !== 200) {
        return Promise.reject(new Error(res.data.message));
    } 
        console.log(res)
        return res
    }).catch((err) => {
        console.error(err.response.data.message);
        return err
    })
}