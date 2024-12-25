"use client";
import useFirebase from "@/hooks/useFirebase";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { toggleOpenSideBar } from "@/lib/store/feature/app.slice";
import { decryptData, getItems } from "@/utils/utils";
import {
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Popover, Spin, theme, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useMemo, useState, useCallback } from "react";

import NotificationCenter from "./NotificationCenter";
import { MenuItemProps } from "antd/lib";
import { logOut } from "@/lib/store/feature/auth.slice";
import Cookies from "js-cookie";
import ConditionRender from "@/hoc/ConditionRender";
import { useRouter } from "next/navigation";
interface IAppHeader {
  isOpenOrClose: boolean;
  open: boolean;
  showDrawer: () => void;
}

const AppHeader = ({ isOpenOrClose, showDrawer }: IAppHeader) => {
  const [open, setOpen] = useState(false);
  const [openAccountInfo, setOpenAccountInfo] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser, loading } = useAppSelector((state) => state.auth);

  // Decrypt current user data
  const userData = useMemo(() => {
    if (currentUser) {
      return decryptData(currentUser);
    }
  }, [currentUser]);

  // Fetch notifications using Firebase
  const {
    data: normalNotifications,
    loadMore: loadNormal,
    loading: loadingNormal,
  } = useFirebase({
    path: "notifications",
    endpoint: userData?.user?.id || "0",
  });

  const {
    data: inviteNotifications,
    loadMore: loadInvite,
    loading: loadingInvite,
  } = useFirebase({
    path: "invitedNotifications",
    endpoint: userData?.user?.id || "0",
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Calculate unread notifications
  const countNormal = useMemo(() => {
    return normalNotifications.filter((item) => !item.is_read).length;
  }, [normalNotifications]);

  const countInvite = useMemo(() => {
    return inviteNotifications.filter((item) => !item.is_read).length;
  }, [inviteNotifications]);

  const handleLogout = () => {
    const refresh_token = Cookies.get("refreshToken");
    dispatch(logOut({ refresh_token: refresh_token })).then(() => router.push("/login"));
  };

  // Handle Popover visibility
  const handlePopoverOpenChange = useCallback((visible: boolean) => {
    setOpen(visible);
  }, []);

  return (
    <>
      <Header className="p-2" style={{ padding: 0, background: colorBgContainer }}>
        <nav className="flex justify-between pe-2">
          <Button
            type="text"
            icon={isOpenOrClose ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleOpenSideBar())}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="flex items-center gap-2">
            <Button type="text" onClick={showDrawer}>
              <TeamOutlined />
            </Button>
            <NotificationCenter
              open={open}
              normalNotifications={normalNotifications}
              countNormal={countNormal}
              loadingNormal={loadingNormal}
              inviteNotifications={inviteNotifications}
              countInvite={countInvite}
              loadingInvite={loadingInvite}
              loadInvite={loadInvite}
              handlePopoverOpenChange={handlePopoverOpenChange}
              loadNormal={loadNormal}
            />

            <Popover
              placement="bottomRight"
              trigger="click"
              className="hover:cursor-pointer"
              content={
                <Button onClick={handleLogout} type="link" icon={<LogoutOutlined style={{ color: "red" }} />}>
                  <Typography color="black">Logout</Typography>
                </Button>
              }
            >
              <Avatar icon={<UserOutlined />} />
            </Popover>
          </div>
        </nav>
      </Header>
      <ConditionRender condition={loading}>
        <Spin indicator={<LoadingOutlined spin />} fullscreen tip="Loading ..." />
      </ConditionRender>
    </>
  );
};

export default AppHeader;
