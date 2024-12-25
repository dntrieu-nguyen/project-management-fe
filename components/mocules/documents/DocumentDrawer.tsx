"use client";
import { IDocumentDrawerProps } from "@/types/components";
import { Button, Drawer, Typography } from "antd";
import React from "react";
import { Editor } from "../TextEditor";
import { useRouter } from "next/navigation";

const DocumentDrawer = (props: IDocumentDrawerProps) => {
  const { data } = props;
  const router = useRouter();
  const onClick = () => {
    router.push(`documents/${data.id}`);
  };
  return (
    <Drawer
      size="large"
      title={
        <div className="flex justify-between items-center">
          <Typography>Project Document</Typography>

          <Button type="link" onClick={onClick}>
            Detail
          </Button>
        </div>
      }
      placement="right"
      closable={false}
      className="absolute bg-blue-600 p-0"
      onClose={props.onClose}
      open={props.open}
      getContainer={false}
    >
      <Editor htmlContent={data.content || ""}></Editor>
    </Drawer>
  );
};

export default DocumentDrawer;
