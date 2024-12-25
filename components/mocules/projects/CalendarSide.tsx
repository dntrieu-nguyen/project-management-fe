"use client";

import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { ICalendarSide, ListDataItem } from "@/types/components";
import { IProject } from "@/types/project";
import dayjs from "dayjs";

const convertProjectsToListData = (
  projects: IProject[],
  targetDay: number,
  targetMonth: number,
  targetYear: number,
): ListDataItem[] => {
  return projects
    .filter((project) => {
      const projectDate = dayjs(project.created_at);
      return (
        projectDate.date() === targetDay && projectDate.month() === targetMonth && projectDate.year() === targetYear
      );
    })
    .map((project) => ({
      type: project.status === "completed" ? "success" : "warning",
      content: project.name,
    }));
};

const CalendarSide = (props: ICalendarSide) => {
  const { data } = props;

  const getListData = (value: Dayjs) => {
    const targetDay = value.date();
    const targetMonth = value.month();
    const targetYear = value.year();
    return convertProjectsToListData(data, targetDay, targetMonth, targetYear);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return listData.length > 0 ? (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={`${item.content}-${index}`}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    ) : null;
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
    return null;
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar className="h-80" cellRender={cellRender} />;
};

export default CalendarSide;
