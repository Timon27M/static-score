"use client";
import { Button } from "@mui/material";
import { useRouter  } from "next/navigation";
import styled from "@emotion/styled";

import React from "react";

const Div = styled.div(`
  display: flex;
  margin-top: 50px;
  justify-content: space-around;
  gap: 20px;

`)

const Component = () => {

  const router = useRouter();

  return (
    <Div>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/sign-in')}>Login</Button>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/random-page')}>Page</Button>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/sign-up')}>Registration</Button>
    </Div>
  );
};

export default Component;
