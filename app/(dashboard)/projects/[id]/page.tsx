"use client";
import { getAllTasksByProjectID } from "@/apis/tasks";
import AppTable from "@/components/mocules/projects/AppTable";
import ConditionRender from "@/hoc/ConditionRender";
import { IProject } from "@/types/project";
import { IPagination } from "@/types/components";
import { ITask } from "@/types/task";
import { getItems } from "@/utils/utils";

import {
  Breadcrumb,
  Descriptions,
  DescriptionsProps,
  Divider,
  Empty,
  message,
  Pagination,
  TableColumnsType,
  Tooltip,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import DetailTask from "@/components/mocules/tasks/DetailTask";
import TaskCollapse from "@/components/mocules/tasks/TaskCollapse";
import { getBreadCrumbItems, getColumnsTask, getItemsDescription } from "@/constants/project";
import { get_list_user } from "@/apis/user";
import useFetch from "@/hooks/useFetch";
import DetailProjectLoading from "@/components/mocules/skeleton/DetailProjectLoading";

const DetailProject = () => {
  const [active, setActive] = React.useState("in-process");
  const [data, setData] = React.useState<ITask[] | []>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(false);
  const [openDetailTask, setOpenDetailTask] = React.useState<boolean>(false);
  const [dataProject, setDataProject] = React.useState<IProject | undefined>(undefined);
  const [selectedTask, setSelectedTask] = React.useState<ITask | {}>({});
  const [detailProject, setDetailProject] = React.useState<IProject | any>();
  const [pagination, setPagination] = React.useState<IPagination>({
    current: 0,
    pageSize: 0,
    total: 0,
    totalPage: 0,
    prevPage: null,
    nextPage: null,
  });

  const router = useRouter();
  const params = useParams();

  // const { data: listData, error, loading, refetch } = useFetch(get_list_user({ project_id: params.id.toString() }));

  const fetchListUser = async (project_id: string) => {
    try {
      const res = await get_list_user({ project_id });
      console.log("res", res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  // console.log("check date", listData);

  const fetchListTask = async (project_id: string) => {
    try {
      setLoadingData(true);
      const res = await getAllTasksByProjectID({ project_id });
      if (res.success) {
        const newData = res.data.project.tasks.map((item: ITask) => ({
          ...item,
          key: item.id,
        }));
        setData(newData);
      }
      setDataProject(getItems("detailProject"));
    } catch (error: any) {
      error && message.error(error.message || "something went wrong");
    } finally {
      setLoadingData(false);
    }
  };

  React.useEffect(() => {
    if (params.id) {
      fetchListTask(params.id.toString());
      fetchListUser(params.id.toString());
    }
  }, []);

  const onPageChange = async (pagination: any, filters: any, sorter: any, extra: any) => {
    try {
    } catch (error: any) {
      message.error(error.message || "something went wrong");
    }
  };

  const onOpenDetailTask = (record: ITask) => {
    setOpenDetailTask(true);
    setSelectedTask(record);
  };

  // Items
  const columns: TableColumnsType = getColumnsTask(data, onOpenDetailTask);
  const itemsDescription: DescriptionsProps["items"] = getItemsDescription(dataProject);
  const breadCrumbItems = getBreadCrumbItems(router, detailProject);

  React.useEffect(() => {
    const detailProjectFromLocal = getItems("detailProject");
    if (detailProjectFromLocal) setDetailProject(detailProjectFromLocal);
  }, []);
  return (
    <>
      <ConditionRender condition={Boolean(detailProject)}>
        <DetailTask
          project_id={detailProject && detailProject.id}
          open={openDetailTask}
          onClose={() => setOpenDetailTask(false)}
          data={selectedTask}
        />
      </ConditionRender>
      <div style={{ height: "calc(100vh - 160px)" }}>
        <div className="mb-3">
          <Breadcrumb className="mb-3" items={breadCrumbItems} />
        </div>
        <Divider orientation="left">
          <Tooltip title="action" arrow={false} color="#ffffff0">
            Information
          </Tooltip>
        </Divider>

        <ConditionRender condition={Boolean(dataProject)}>
          <ConditionRender condition={!loadingData}>
            <Descriptions items={itemsDescription} />
          </ConditionRender>
        </ConditionRender>
        <ConditionRender condition={!Boolean(dataProject) && !loadingData}>
          <Empty />
        </ConditionRender>
        <ConditionRender condition={loadingData}>
          <DetailProjectLoading></DetailProjectLoading>
        </ConditionRender>

        <Divider orientation="left">Documents</Divider>
        <AppTable
          loading={loadingData}
          onPageChange={onPageChange}
          columns={columns}
          data={data}
          pagination={pagination}
        />

        <Divider orientation="left">Tasks</Divider>
        <div className="flex w-full justify-end">
          <Pagination />
        </div>
        <TaskCollapse data={[]} type="close" />
        <TaskCollapse data={[]} type="cancel" />
        <TaskCollapse data={[]} type="pending" />
        <TaskCollapse data={[]} type="in-process" />
        <TaskCollapse data={[]} type="completed" />
      </div>
    </>
  );
};

export default DetailProject;
