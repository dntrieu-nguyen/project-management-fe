"use client";

import { Editor } from "@/components/mocules/TextEditor";
import { template } from "@/constants/templates";
import { Button, Divider, Typography } from "antd";
import React from "react";

const CreateDocumentPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title className="font-bold" level={3}>
          Create Documents
        </Typography.Title>
        <Button type="dashed">
          <Typography.Text type="success">Submit</Typography.Text>
        </Button>
      </div>
      <Divider />
      {/* <Editor htmlContent={detailDocument.content || template} /> */}
      <Editor htmlContent={template} />
    </>
  );
};

export default CreateDocumentPage;
