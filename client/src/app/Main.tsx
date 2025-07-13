"use client";
import { Button } from "@mui/material";
import { useRouter  } from "next/navigation";
import styled from "@emotion/styled";

import React from "react";
import { logoutApi } from "@/features/logout/api/api";

const Div = styled.div(`
  display: flex;
  margin-top: 50px;
  justify-content: space-around;
  gap: 20px;

`)

const Main = () => {

  const router = useRouter();

  function handleLogout() {
    logoutApi().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <Div>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/sign-in')}>Login</Button>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/random-page')}>Page</Button>
      <Button size="large" type="submit" variant={"contained"} onClick={() => router.push('/sign-up')}>Registration</Button>
      <Button size="large" type="submit" variant={"contained"} onClick={handleLogout}>logout</Button>
    </Div>
  );
};

export default Main;
