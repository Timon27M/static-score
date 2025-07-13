"use client";

import { useStore } from "../store/hooks/useStore";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "./api/userApi";

type TProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: TProps) {
  const router = useRouter();

  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    getUser()
      .then((res) => {
        console.log(res.data);
        if (res.status !== 200) {
            return Promise.reject(new Error('Пользователь не зарегестрирован'));
        }
        store.user.setUser({ ...res.data, isLoggedIn: true });
        setIsLoading(false);
      })
      .catch(() => {
        router.push("/sign-in");
      })
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>; // Или ваш кастомный loader
  }

  return <div>{children}</div>;
}

export default AuthProvider;
