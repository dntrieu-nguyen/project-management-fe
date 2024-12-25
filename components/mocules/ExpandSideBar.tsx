"use client";
import { get_list_project } from "@/apis/app";
import { SIDEBAR } from "@/constants";
import useFetch from "@/hooks/useFetch";
import {
  BarChartOutlined,
  BookFilled,
  BookOutlined,
  ContainerFilled,
  ContainerOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  PlusCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Col, DatePicker, Form, Input, Menu, Modal, Row, Select, Tag, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import Sider from "antd/es/layout/Sider";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IExpandSideBar {
  isOpenOrClose: boolean;
}

const ExpandSideBar = (props: IExpandSideBar) => {
  const [activeRouter, setActiveRouter] = React.useState(SIDEBAR.DASHBOARD.NAME);
  const { data, loading, error, refetch } = useFetch(get_list_project);
  const [openCreateProjectModal, setOpenCreateProjectModal] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  React.useEffect(() => {
    setActiveRouter(pathname);
  }, [pathname]);

  const menuItems: ItemType<MenuItemType>[] | undefined = [
    {
      key: "0",
      label: (
        <div className="flex items-center justify-center">
          {!props.isOpenOrClose ? <div>Management</div> : <div>M</div>}
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: SIDEBAR.DASHBOARD.PATH,
      icon: <BarChartOutlined />,
      label: SIDEBAR.DASHBOARD.NAME,
      onClick: () => router.push(SIDEBAR.DASHBOARD.PATH),
    },
    {
      key: SIDEBAR.PROJECTS.PATH,
      icon: <FolderOutlined />,
      label: SIDEBAR.PROJECTS.NAME,
      onClick: () => router.push(SIDEBAR.PROJECTS.PATH),
    },
    {
      key: SIDEBAR.TASKS.PATH,
      icon: <FileTextOutlined />,
      label: SIDEBAR.TASKS.NAME,
      onClick: () => router.push(SIDEBAR.TASKS.PATH),
    },
    {
      key: SIDEBAR.USERS.PATH,
      icon: <TeamOutlined />,
      label: SIDEBAR.USERS.NAME,
      onClick: () => router.push(SIDEBAR.USERS.PATH),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <div className="flex items-center justify-center">
          {!props.isOpenOrClose ? <div>Workspace</div> : <div>WS</div>}
        </div>
      ),
    },
    {
      type: "item",
      key: "create-project",
      icon: <PlusCircleOutlined />,
      label: "Create Project",
      onClick: () => setOpenCreateProjectModal(true),
    },
    {
      key: "project-1",
      label: "Project 1",
      icon: <FolderOpenOutlined />,
      children: [
        {
          type: "item",
          key: "create-task",
          label: "Create Task",
          icon: <PlusCircleOutlined />,
        },
        {
          type: "item",
          key: "create-document",
          label: "Create Document",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "document",
          label: "Document",
          icon: <BookFilled />,
          children: [
            {
              key: "document-1",
              label: "Document 1",
              icon: <BookOutlined />,
            },
            {
              key: "document-2",
              label: "Document 2",
              icon: <BookOutlined />,
            },
          ],
        },
        {
          key: "list-task",
          label: "Tasks",
          icon: <ContainerFilled />,
          children: [
            {
              key: "task-1",
              label: "Task 1",
              icon: <ContainerOutlined />,
            },
            {
              key: "task-2",
              label: "Task 2",
              icon: <ContainerOutlined />,
            },
          ],
        },
      ],
    },
  ];

  const handleOk = () => {};

  const handleCancel = () => {
    setOpenCreateProjectModal(false);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Modal
        open={openCreateProjectModal}
        title="Create New Project"
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <div className="h-96 w-full overflow-y-auto p-2">
          <Form layout="vertical">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Start Date" name="start_date">
                  <DatePicker disabledDate={disabledDate} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="End Date" name="end_date">
                  <DatePicker disabledDate={disabledDate} className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Status" name="status">
                  <Select>
                    <Select.Option value="pending">
                      <Tag color="blue">Pending</Tag>
                    </Select.Option>
                    <Select.Option value="in-process">
                      <Tag color="purple">In Process</Tag>
                    </Select.Option>
                    <Select.Option value="completed">
                      <Tag color="green">Completed</Tag>
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12} align="middle">
              <Col span={12}>
                <Form.Item label="Assignee" name="assignee">
                  <Select mode="multiple" allowClear placeholder="Please select a user">
                    <Select.Option value="user1">User 1</Select.Option>
                    <Select.Option value="user2">User 2</Select.Option>
                    <Select.Option value="user3">User 3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Avatar.Group max={{ count: 3 }}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                  <Avatar style={{ backgroundColor: "#7265e6" }}>U</Avatar>
                  <Avatar style={{ backgroundColor: "#ffbf00" }}>OP</Avatar>
                  <Avatar style={{ backgroundColor: "#00a2ae" }}>OS</Avatar>
                </Avatar.Group>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={6} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <Sider
        className="overflow-y-auto h-screen bg-white"
        style={{ backgroundColor: "white" }}
        trigger={null}
        collapsible
        collapsed={props.isOpenOrClose}
      >
        <div className="h-16 bg-white flex items-center justify-center">
          <span>AVT</span>
        </div>
        <Menu
          style={{ height: "calc(100vh - 64px)" }}
          theme="light"
          mode="vertical"
          selectedKeys={[activeRouter]}
          items={menuItems}
        />
      </Sider>
    </>
  );
};

export default ExpandSideBar;
