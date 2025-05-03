"use client";
import {FormProvider, useForm} from 'react-hook-form';

import React, { FC } from "react";
import {TRegisterForm} from "@/features/auth/model/types";
import RegisterForm from '@/features/auth/ui/RegisterForm';
import styled from "@emotion/styled";

const RegisterPage = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignUp: FC = () => {

  const methods = useForm<TRegisterForm>();

  return (
  <RegisterPage>
    <FormProvider {...methods}>
      <RegisterForm />
    </FormProvider>
  </RegisterPage>
  );
}

 export default SignUp;