"use client";
import React from "react";
import { Tabs, Button, Popover, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { INotificationCenterProps } from "@/types/components";
import { TabsProps } from "antd/lib";
import { getNotificationItems } from "@/constants/notification.const";
import { declineInvitation } from "@/apis/tasks";
import { useAppSelector } from "@/hooks/useStore";

const NotificationCenter = (props: INotificationCenterProps) => {
  const { open, handlePopoverOpenChange, countNormal, countInvite } = props;
  const [declineLoading, setDeclineLoading] = React.useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = React.useState<boolean>(false);

  const { project: IProject } = useAppSelector((state) => state.project);

  const onAcceptInvite = (item: string) => {
    console.log("Accept Invite", item);
  };

  const onDeclineInvite = async (item: any) => {
    console.log("Decline Invite", item);
    try {
      setDeclineLoading(true);

      const res = await declineInvitation({
        invitation_id: item.key,
        project_id: item.project,
        task_id: item.task,
      });
    } catch (error) {
    } finally {
      setDeclineLoading(false);
    }
  };

  const items: TabsProps["items"] = getNotificationItems(
    props,
    onAcceptInvite,
    onDeclineInvite,
    acceptLoading,
    declineLoading,
  );

  return (
    <Popover
      open={open}
      onOpenChange={handlePopoverOpenChange}
      placement="bottomRight"
      trigger="click"
      content={
        <Tabs
          style={{ height: "400px" }}
          className="overflow-y-auto"
          centered
          items={items}
          defaultActiveKey="normal"
        />
      }
    >
      <Button type="text" className="p-0 m-0">
        <Badge count={countNormal + countInvite} offset={[10, 0]}>
          <BellOutlined className="p-0 mx-0 text-lg" />
        </Badge>
      </Button>
    </Popover>
  );
};

export default NotificationCenter;
