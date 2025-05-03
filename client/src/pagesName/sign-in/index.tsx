"use client";
import {FormProvider, useForm} from 'react-hook-form';
import styled from "@emotion/styled";

import React, { FC } from "react";
import LoginForm from "@/features/auth/ui/LoginForm";
import {TLoginForm} from "@/features/auth/model/types";

const LoginPage = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignIn: FC = () => {

  const methods = useForm<TLoginForm>();

  return (
  <LoginPage>
    <FormProvider {...methods}>
      <LoginForm />
    </FormProvider>
  </LoginPage>
  );
}

 export default SignIn;