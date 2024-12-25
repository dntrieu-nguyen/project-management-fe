import { ITaskCollapseItems, ITaskCollapseProps } from "@/types/components";
import { setColorStatus, setTitle } from "@/utils/app";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Collapse, Divider, Tag } from "antd";
import React from "react";

export const setIconStatus = (value: string) => {
  switch (value) {
    case "pending":
      return <ClockCircleOutlined />;
    case "in-process":
      return <SyncOutlined />;
    case "completed":
      return <CheckCircleOutlined />;
    case "cancel":
      return <CloseCircleOutlined />;
    case "close":
      return <StopOutlined />;
    default:
      break;
  }
};

const TaskCollapse = (props: ITaskCollapseProps) => {
  const items: ITaskCollapseItems[] = [
    {
      key: props.type,
      children: "Task 1",
      label: (
        <Tag icon={<>{setIconStatus(props.type)}</>} color={setColorStatus(props.type)}>
          {setTitle(props.type)}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Collapse ghost items={items} />
    </>
  );
};

export default TaskCollapse;
