"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { GoogleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { loginUser, toggleRemember } from "@/lib/store/feature/auth.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { err, loading, isRemember } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const handleToggleRemember = () => {
    dispatch(toggleRemember("toggle"));
  };

  React.useEffect(() => {
    if (err) {
      message.error({
        content: err,
      });
    }
  }, [err]);

  const onFinish = (values: FormValues) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password })).then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          <p className="text-gray-600">Welcome back to Project Management</p>
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
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
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
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" className="flex items-center justify-between mb-0">
                <Checkbox
                  checked={isRemember}
                  defaultChecked={isRemember}
                  className="m-0"
                  onChange={handleToggleRemember}
                >
                  {" "}
                  Remember me
                </Checkbox>
              </Form.Item>
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              loading={loading}
              block
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Log in
            </Button>
            <Button
              block
              type="default"
              className="w-full mt-4 border border-gray-300 text-gray-600 py-2 rounded-md flex items-center justify-center hover:bg-gray-100"
              onClick={() => message.info("Google login feature not implemented")}
            >
              <GoogleOutlined className="mr-2" />
              Log in with Google
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
