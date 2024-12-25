"use client";
import { IMessage } from "@/types/components";
import { message } from "antd";
import React, { useEffect } from "react";

const Message: React.FC<IMessage> = ({ content = "message", type = "info" }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.open({
      type: type,
      content: content,
    });
  }, [messageApi, type, content]);

  return <>{contextHolder}</>;
};

export default Message;
