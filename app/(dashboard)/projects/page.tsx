"use client";
import { getAllDocuments } from "@/apis/documents";
import { deleteProjectById, getAllProjects, getAllProjectsByUser } from "@/apis/project";
import DocumentDrawer from "@/components/mocules/documents/DocumentDrawer";
import AppTable from "@/components/mocules/projects/AppTable";
import CalendarSide from "@/components/mocules/projects/CalendarSide";
import Confirm from "@/components/organisms/Confirm";
import { AVATAR_URL } from "@/constants";
import { getColumnsProject } from "@/constants/project";
import { PROJECT_URL } from "@/constants/project.const";
import ConditionRender from "@/hoc/ConditionRender";
import useDevice from "@/hooks/useDevice";
import useFetch from "@/hooks/useFetch";
import { useAppDispatch } from "@/hooks/useStore";
import { updateDetailDocument, updateDetailProject } from "@/lib/store/feature/project.slice";
import { IPagination } from "@/types/components";
import { IDocument } from "@/types/document";
import { IAllProjectResponse, IProject, IQueryFilterProject, Tab } from "@/types/project";
import { IErrorResponse, ISuccessResponse } from "@/types/response";
import { setColorStatus } from "@/utils/app";

import { DeleteOutlined, EyeOutlined, FolderFilled, HomeOutlined, ProfileFilled } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Divider,
  Empty,
  List,
  message,
  Segmented,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ProjectPage = () => {
  const [tab, setTab] = React.useState<Tab>("LIST");
  const [data, setData] = React.useState<IProject[] | []>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = React.useState<boolean>(false);
  const [selectedProject, setSelectedProject] = React.useState<IProject | {}>({});
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [documentDrawerVisible, setDocumentDrawerVisible] = React.useState<boolean>(false);
  const [detailDocument, setDetailDocument] = React.useState<IDocument | {}>({});
  const [pagination, setPagination] = React.useState<IPagination>({
    current: 0,
    pageSize: 0,
    total: 0,
    totalPage: 0,
    prevPage: null,
    nextPage: null,
  });

  const { mb, pc, lpc, tb, tbc } = useDevice();
  const {
    data: documentData,
    loading: documentLoading,
    error: documentError,
    refetch: refetchDocument,
  } = useFetch(getAllDocuments);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const breadCrumbItems = [
    {
      title: <HomeOutlined />,
      onClick: () => router.push("/dashboard"),
    },
    {
      onClick: () => router.push("/projects"),
      title: (
        <>
          <FolderFilled />
          <span>Projects</span>
        </>
      ),
    },
  ];

  const onDeleteRecord = async (record: any) => {
    try {
      setRemoveLoading(true);
      const res: ISuccessResponse = await deleteProjectById({
        project_id: record.id,
      });
      if (res.success) {
        message.success({
          content: res.message,
        });
      }
      await fetchData({});
    } catch (error: IErrorResponse | any) {
      error && message.error({ content: error.message || "something went wrong" });
    } finally {
      setRemoveLoading(false);
    }
  };

  const fetchData = async (params: IQueryFilterProject) => {
    try {
      setDataLoading(true);
      const res: IAllProjectResponse = await getAllProjectsByUser(params);
      if (res.success) {
        const newData = res.data.map((item) => ({ ...item, key: item.id }));
        setData(newData);
        if (res.pagination) {
          setPagination({
            current: res.pagination.page,
            pageSize: res.pagination.page_size,
            total: res.pagination.total,
            totalPage: res.pagination.total_pages,
            prevPage: res.pagination.previous,
            nextPage: res.pagination.next,
          });
        }
      }
    } catch (error: any) {
      error && message.error(error.message || "something went wrong");
    } finally {
      setDataLoading(false);
    }
  };

  const onPageChange = async (pagination: any, filters: any, sorter: any, extra: any) => {
    try {
      const res = await fetchData({
        page: pagination.current,
      });
    } catch (error: any) {
      error && message.error(error.message || "something went wrong");
    }
  };

  const handleCloseDocumentDrawer = () => {
    setDocumentDrawerVisible(false);
  };

  const handleOpenDocumentDrawer = (item: IDocument) => {
    setDocumentDrawerVisible(true);
    setDetailDocument(item);
    dispatch(updateDetailDocument(item));
  };

  React.useEffect(() => {
    fetchData({});
  }, []);

  const onDetailProject = (record: IProject) => {
    dispatch(updateDetailProject(record));

    router.push(`${PROJECT_URL.BASE}/${record.id}`);
  };

  const showModal = (record: IProject) => {
    setIsModalVisible(true);
    setSelectedProject((prev) => ({ ...prev, ...record }));
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      setRemoveLoading(true);
      console.log("record", selectedProject);
      fetchData({});
    } catch (error: any) {
      error && message.error({ content: error.message || "something went wrong" });
    } finally {
      setRemoveLoading(false);
    }

    closeModal();
  };

  const columns: TableColumnsType = getColumnsProject(data, showModal, onDetailProject);

  return (
    <>
      <Confirm
        open={isModalVisible}
        content="Do you want to delete this project?"
        title="Warning"
        onCancel={closeModal}
        onOk={handleSubmit}
        okText="OK"
        cancelText="Cancel"
        type="error"
      />
      <div className="mb-3">
        <Breadcrumb className="mb-3" items={breadCrumbItems} />
      </div>
      <Divider></Divider>
      {/* list project */}
      <Segmented className="mb-3 w-fit" value={tab} onChange={setTab} options={["LIST", "CALENDAR"]} />
      <ConditionRender condition={tab === "LIST"}>
        <div className="grid grid-cols-2 mt-3 gap-5">
          <Card className="overflow-y-auto h-80" bordered={false} title="List Projects">
            <List
              loading={dataLoading}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item actions={[<Tag color={setColorStatus(item.status)}>{item.status}</Tag>]}>
                  <List.Item.Meta
                    avatar={<Avatar src={`${AVATAR_URL}${index}`} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <>
                        <Typography>{item.description || "No description"}</Typography>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* list project documents */}
          <Card
            className="overflow-y-auto h-80"
            bordered={false}
            title={
              <div className="flex justify-between items-center">
                <h4 className="m-0">List Documents</h4>

                <Button type="dashed" onClick={() => {}}>
                  <Typography.Text type="success" onClick={() => router.push("/documents/create")}>
                    Create Documents
                  </Typography.Text>
                </Button>
              </div>
            }
          >
            <ConditionRender condition={Boolean(documentData)}>
              <List
                loading={documentLoading}
                itemLayout="horizontal"
                dataSource={documentData}
                renderItem={(item: IDocument) => (
                  <List.Item
                    actions={[
                      <div className="flex gap-3">
                        <Button type="link" onClick={() => handleOpenDocumentDrawer(item)}>
                          <EyeOutlined />
                        </Button>

                        <Button color="danger" type="link">
                          <DeleteOutlined />
                        </Button>
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<ProfileFilled />}
                      title={<Typography className="hover:cursor-pointer">{item.name}</Typography>}
                      description={item.description || "No description"}
                    />
                  </List.Item>
                )}
              />
            </ConditionRender>
            <ConditionRender condition={!Boolean(documentData)}>
              <Empty />
            </ConditionRender>
          </Card>
        </div>
        {/* Table */}
        <Divider orientation="left">Projects</Divider>

        <div className="my-3">
          <AppTable
            loading={dataLoading}
            onPageChange={onPageChange}
            columns={columns}
            data={data}
            pagination={pagination}
          />
        </div>
      </ConditionRender>
      <ConditionRender condition={tab === "CALENDAR"}>
        <CalendarSide data={data} />
      </ConditionRender>
      {/* Calendar */}
      <DocumentDrawer data={detailDocument} open={documentDrawerVisible} onClose={handleCloseDocumentDrawer} />
    </>
  );
};

export default ProjectPage;
