"use client";
import React from "react";
import useDevice from "@/hooks/useDevice";
import CommentComponent from "@/components/mocules/tasks/CommentComponent";

function DashboardPage() {
  const { mb, tb, pc, tbc } = useDevice();

  const onSubmit = () => {};

  return (
    <div>
      DashboardPage
      <CommentComponent></CommentComponent>
    </div>
  );
}

export default DashboardPage;
