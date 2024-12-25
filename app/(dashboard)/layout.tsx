"use client";
import React, { useState } from "react";
import { Drawer, FloatButton, Layout, theme } from "antd";
import { useAppSelector } from "@/hooks/useStore";
import ExpandSideBar from "@/components/mocules/ExpandSideBar";
import AppHeader from "@/components/mocules/AppHeader";
import { CommentOutlined, MenuOutlined, TeamOutlined } from "@ant-design/icons";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const { isOpenOrClose } = useAppSelector((state) => state.app);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout className="min-h-screen">
        {/* sidebar */}
        <ExpandSideBar isOpenOrClose={isOpenOrClose} />

        <Layout>
          {/* Header */}
          <AppHeader isOpenOrClose={isOpenOrClose} open={open} showDrawer={showDrawer} />
          <Layout.Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "white",
              borderRadius: "12px",
            }}
            className="overflow-y-auto"
          >
            <div style={{ height: "calc(100vh - 160px)" }}>{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        className="absolute"
      >
        <p>Some contents...</p>
      </Drawer>

      {/* <FloatButton.Group trigger="click" type="default" style={{ insetInlineEnd: 24 }} icon={<MenuOutlined />}>
        <FloatButton icon={<CommentOutlined />} />
        <FloatButton icon={<TeamOutlined />} />
      </FloatButton.Group> */}
    </>
  );
};

export default DashboardLayout;
