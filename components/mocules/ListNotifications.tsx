"use client";
import React from "react";
import { Avatar,  List, message } from "antd";
import ConditionRender from "@/hoc/ConditionRender";
import { seenNotify } from "@/apis/notification";

interface IListNotifications {
  data: any[];
}

const ListNotifications = (props: IListNotifications) => {
  const handleSeenNotification = async (notification_id: string) => {
    try {
      await seenNotify({ notification_id });
    } catch (error: any) {
      message.error({
        content: error.message,
      });
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      className="w-96"
      renderItem={(item, index) => (
        <>
          <List.Item
            onClick={() => handleSeenNotification(item.key)}
            key={item.key}
            className="w-full relative hover:bg-slate-100/90 hover:cursor-pointer hover:rounded-md"
          >
            <List.Item.Meta
              avatar={<Avatar src={`${process.env.NEXT_PUBLIC_ICON_SVG}${index}`} />}
              title={<a href="#">{item.title}</a>}
              description={item.content}
            />
            <ConditionRender condition={!item.is_read}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyan-600"></div>
            </ConditionRender>
          </List.Item>
        </>
      )}
    />
  );
};

export default ListNotifications;
