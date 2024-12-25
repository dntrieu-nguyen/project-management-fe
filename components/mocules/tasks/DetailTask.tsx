"use client";
import { IDetailTask } from "@/types/components";
import { Avatar, Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, message, Row, Select, Space } from "antd";
import React from "react";
import CommentComponent from "./CommentComponent";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { ISendNotificationRequestBody } from "@/types/notification";
import { sendInvitation } from "@/apis/notification";

const test_user = "f02d24d5-a111-43a5-b6b9-4070cdd0fdc3";

const DetailTask = (props: IDetailTask) => {
  // console.log({ props: props.data });
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  // disbled date in end date if lower than start date
  // const disabledEndDate: RangePickerProps["disabledDate"] = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs(props.data.due_date).startOf("day");
  // };

  const onFinish = () => {};

  const handleOnFinish = async () => {
    try {
      setLoading(true);
      const requestData: ISendNotificationRequestBody = {
        task_id: props.data?.id,
        receiver_id: test_user,
        project_id: props.project_id,
      };
      const res = await sendInvitation(requestData);
    } catch (error: any) {
      error && message.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        title="Detail Task"
        closable={false}
        getContainer={false}
        className="absolute"
        open={props.open}
        onClose={props.onClose}
        width={480}
        placement="right"
      >
        <Button loading={loading} onClick={handleOnFinish}>
          test send
        </Button>
        {Object.keys(props.data).length > 0 && (
          <Form
            form={form}
            layout="vertical"
            initialValues={props.data}
            onFinish={props.onSubmit}
            onFinishFailed={() => {}}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Title" name="title">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Priority" name="priority">
                  <Select>
                    <Select.Option value="low">Low</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="high">High</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Status" name="status">
                  <Select>
                    <Select.Option value="todo">Todo</Select.Option>
                    <Select.Option value="doing">Doing</Select.Option>
                    <Select.Option value="done">Done</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} align="middle">
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

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        <Divider orientation="left">Discussion</Divider>
        {/* <div className="w-full h-96 overflow-y-auto border border-spacing-1 p-2 rounded-md">comment</div> */}
        <CommentComponent></CommentComponent>
      </Drawer>
    </>
  );
};

export default DetailTask;
