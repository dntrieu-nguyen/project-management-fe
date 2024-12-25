"use client";
import React from "react";
import { Modal, Button, Typography } from "antd";

import { IConfirm } from "@/types/components";
import { setTitleType } from "@/constants/project";

const Confirm: React.FC<IConfirm> = ({ open, title, onCancel, onOk, type, content, okText, cancelText }) => {
  return (
    <Modal open={open} title={setTitleType(type, title)} onCancel={onCancel} footer={null}>
      <div>
        <Typography.Paragraph className="my-3">{content}</Typography.Paragraph>
      </div>
      <div className="modal-actions">
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          {cancelText}
        </Button>
        <Button onClick={onOk} type="primary">
          {okText}
        </Button>
      </div>
    </Modal>
  );
};

export default Confirm;
