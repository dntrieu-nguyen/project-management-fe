"use client";
import React from "react";
import { Grid, theme } from "antd";
import { useAppSelector } from "@/hooks/useStore";
import { getItems } from "@/utils/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  return (
    <>
      <section className="flex items-center min-h-screen p-8 bg-slate-50">
        <div className="my-0 mx-auto w-full">{!isLogin ? children : <div className="text-center">Welcome</div>}</div>
      </section>
    </>
  );
};

export default AuthLayout;
