"use client";
import React from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center" as const,
      width: "100%",
    },
    forgotPassword: {
      float: "right" as const,
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <>
      <div style={styles.header}>
        <Title style={styles.title}>Register</Title>
        <Text style={styles.text}>Welcome back to Project Management</Text>
      </div>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button style={{ marginBottom: "15px" }} block type="primary" htmlType="submit">
            Register
          </Button>
          <div style={styles.footer}>
            <Text style={styles.text}>You have an account?</Text> <Link href="">Login now</Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
