"use client";
import { IProject } from "@/types/project";
import { ITask } from "@/types/task";
import { setColorStatus } from "@/utils/app";
import { shortenString } from "@/utils/string";
import { formatDate } from "@/utils/utils";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  FolderFilled,
  FormOutlined,
  HomeOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { Button, Tag, Tooltip } from "antd";
import React from "react";

export const getColumnsTask = (data: ITask[], onOpenDetailTask: (record: ITask) => void) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    fixed: "left" as "left" | "right" | undefined,
    render: (value: any) => (
      <Tooltip title={value} placement="top">
        {shortenString(value, 5)}
      </Tooltip>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 100,
    filters:
      data &&
      data.map((item: ITask) => {
        return {
          text: item.title,
          value: item.title,
        };
      }),
    filterMode: "tree" as "tree" | "menu" | undefined,
    filterSearch: true,
    fixed: "left" as "left" | "right" | undefined,
    onFilter: (value, record: ITask | any) => record.title.include(value as string),
    render: (value: any) => (
      <Tooltip title={value} placement="top">
        {shortenString(value, 20)}
      </Tooltip>
    ),
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
    width: 200,
    render: (value: any) => (
      <Tooltip title={value} placement="top">
        {shortenString(value, 50) || "No description"}
      </Tooltip>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,
    filterMode: "tree" as "tree" | "menu" | undefined,
    filterSearch: true,
    filters: [
      {
        text: <Tag color="blue">Pending</Tag>,
        value: "pending",
      },
      {
        text: <Tag color="purple">In Process</Tag>,
        value: "in-process",
      },
      {
        text: <Tag color="green">Completed</Tag>,
        value: "completed",
      },
    ],
    render: (value: any) => <Tag color={setColorStatus(value)}>{value}</Tag>,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
    render: (value: any) => formatDate(value, "string"),
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 120,
    render: (value: any) => formatDate(value, "string"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    fixed: "right" as "left" | "right" | undefined,
    render: (value, record: ITask | any, index) => {
      return (
        <div className="flex gap-1">
          <Button type="link" onClick={() => onOpenDetailTask(record)}>
            <EyeOutlined size={100} color="red" />
          </Button>
          <Button type="link" onClick={() => console.log(record)}>
            <FormOutlined size={100} color="cyan" />
          </Button>
          <Button danger type="link" onClick={() => console.log(record)}>
            <DeleteOutlined size={100} color="blue" />
          </Button>
        </div>
      );
    },
  },
];

export const getItemsDescription = (dataProject: IProject | undefined) => [
  {
    key: "name",
    label: "Name",
    children: dataProject && dataProject.name,
  },

  {
    key: "owner",
    label: "Owner",
    children: dataProject && dataProject.owner,
  },
  {
    key: "members",
    label: "Members",
    children: dataProject ? dataProject && dataProject.members.length : 0,
  },
  {
    key: "description",
    label: "Description",
    children: (dataProject && dataProject.description) || "No description",
    span: 3,
  },
  {
    key: "is_deleted",
    label: "Delete",
    children:
      dataProject && dataProject.is_deleted ? (
        <Tag color="red-inverse">Cancel</Tag>
      ) : (
        <Tag color="green-inverse">Open</Tag>
      ),
  },
  {
    key: "status",
    label: "Status",
    children: dataProject && dataProject.status,
  },
  {
    key: "due_date",
    label: "Due date",
    children: dataProject && formatDate(dataProject.created_at, "string"),
  },
  {
    key: "updated_at",
    label: "Updated At",
    children: dataProject && formatDate(dataProject.updated_at, "string"),
  },
  {
    key: "created_at",
    label: "Created At",
    children: dataProject && formatDate(dataProject.created_at, "string"),
  },
];

export const getBreadCrumbItems = (router: any, dataProject: IProject | undefined) => [
  {
    title: <HomeOutlined className="hover:cursor-pointer hover:underline" />,
    onClick: () => router.push("/dashboard"),
  },
  {
    onClick: () => router.push("/projects"),
    title: (
      <div className="hover:cursor-pointer hover:underline">
        <FolderFilled />
        <span>Projects</span>
      </div>
    ),
  },
  {
    title: (
      <>
        <span className="hover:cursor-pointer hover:underline">{dataProject ? dataProject.name : "loading..."}</span>
      </>
    ),
  },
];

export const getColumnsProject = (
  data: IProject[] | undefined,
  showModal: (record: IProject) => void,
  onDetailProject: (record: IProject) => void,
) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    fixed: "left" as "left" | "right" | undefined,
    render: (value: any) => (
      <Tooltip title={value} placement="top">
        {shortenString(value, 5)}
      </Tooltip>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    filters:
      data &&
      data.map((item: IProject) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
    filterMode: "tree" as "tree" | "menu" | undefined,
    filterSearch: true,
    fixed: "left" as "left" | "right" | undefined,
    onFilter: (value, record) => record.name.startsWith(value as string),
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 400,
    render: (value: any) => <Tooltip title={value}>{shortenString(value, 50)}</Tooltip>,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    width: 200,
    render: (value: any) => <Tooltip title={value}>{shortenString(value)}</Tooltip>,
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    width: 200,
    render: (value: string[]) => <Tooltip title={value.join(", ")}>{value.length}</Tooltip>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,
    filterMode: "tree" as "tree" | "menu" | undefined,
    filterSearch: true,
    filters: [
      {
        text: <Tag color="blue">Pending</Tag>,
        value: "pending",
      },
      {
        text: <Tag color="purple">In Process</Tag>,
        value: "in-process",
      },
      {
        text: <Tag color="green">Completed</Tag>,
        value: "completed",
      },
    ],
    render: (value: any) => <Tag color={setColorStatus(value)}>{value}</Tag>,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
    render: (value: any) => formatDate(value, "string"),
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 120,
    render: (value: any) => formatDate(value, "string"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    fixed: "right" as "left" | "right" | undefined,
    render: (value, record: IProject | any, index) => (
      <div className="flex gap-3">
        <Button type="link" onClick={() => onDetailProject(record)}>
          <EyeOutlined size={100} color="red" />
        </Button>
        <Button danger type="link" onClick={() => showModal(record)}>
          <DeleteOutlined size={100} color="blue" />
        </Button>
      </div>
    ),
  },
];

export const setTitleType = (type: string, content: React.ReactNode) => {
  switch (type) {
    case "success":
      return (
        <>
          {content}
          <CheckCircleFilled className="mx-2" size={40} style={{ color: "green" }} />
        </>
      );
    case "warning":
      return (
        <>
          {content}
          <ExclamationCircleFilled className="mx-2" sizes="" style={{ color: "orange" }} />
        </>
      );
    case "error":
      return (
        <>
          {content}
          <CloseCircleFilled className="mx-2" sizes="" style={{ color: "red" }} />
        </>
      );
    case "info":
      return (
        <>
          {content}
          <QuestionCircleFilled className="mx-2" sizes="" style={{ color: "blue" }} />
        </>
      );

    default:
      break;
  }
};

// function
