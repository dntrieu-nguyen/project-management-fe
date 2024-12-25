import {
  BarChartOutlined,
  BookFilled,
  BookOutlined,
  ContainerFilled,
  ContainerOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  PlusCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const getMenuItems = (SIDEBAR: any, router: any, props: any) => [
  {
    key: "0",
    label: (
      <div className="flex items-center justify-center">
        {!props.isOpenOrClose ? <div>Management</div> : <div>M</div>}
      </div>
    ),
  },
  {
    type: "divider",
  },
  {
    key: SIDEBAR.DASHBOARD.PATH,
    icon: <BarChartOutlined />,
    label: SIDEBAR.DASHBOARD.NAME,
    onClick: () => router.push(SIDEBAR.DASHBOARD.PATH),
  },
  {
    key: SIDEBAR.PROJECTS.PATH,
    icon: <FolderOutlined />,
    label: SIDEBAR.PROJECTS.NAME,
    onClick: () => router.push(SIDEBAR.PROJECTS.PATH),
  },
  {
    key: SIDEBAR.TASKS.PATH,
    icon: <FileTextOutlined />,
    label: SIDEBAR.TASKS.NAME,
    onClick: () => router.push(SIDEBAR.TASKS.PATH),
  },
  {
    key: SIDEBAR.USERS.PATH,
    icon: <TeamOutlined />,
    label: SIDEBAR.USERS.NAME,
    onClick: () => router.push(SIDEBAR.USERS.PATH),
  },
  {
    type: "divider",
  },
  {
    key: "1",
    label: (
      <div className="flex items-center justify-center">
        {!props.isOpenOrClose ? <div>Workspace</div> : <div>WS</div>}
      </div>
    ),
  },
  {
    type: "item",
    key: "create-project",
    icon: <PlusCircleOutlined />,
    label: "Create Project",
  },
  {
    key: "project-1",
    label: "Project 1",
    icon: <FolderOpenOutlined />,
    children: [
      {
        type: "item",
        key: "create-task",
        label: "Create Task",
        icon: <PlusCircleOutlined />,
      },
      {
        type: "item",
        key: "create-document",
        label: "Create Document",
        icon: <PlusCircleOutlined />,
      },
      {
        key: "document",
        label: "Document",
        icon: <BookFilled />,
        children: [
          {
            key: "document-1",
            label: "Document 1",
            icon: <BookOutlined />,
          },
          {
            key: "document-2",
            label: "Document 2",
            icon: <BookOutlined />,
          },
        ],
      },
      {
        key: "list-task",
        label: "Tasks",
        icon: <ContainerFilled />,
        children: [
          {
            key: "task-1",
            label: "Task 1",
            icon: <ContainerOutlined />,
          },
          {
            key: "task-2",
            label: "Task 2",
            icon: <ContainerOutlined />,
          },
        ],
      },
    ],
  },
];
