import { ITask } from "./task.d";
import { IDocument } from "./document";
import { IProject } from "./project";
import { ITask } from "./task";

export interface IMessage {
  type: "success" | "warning" | "error" | "loading" | "info";
  content: string;
}

export interface ChildrenComponent {
  children: React.ReactNode;
}

export interface IPagination {
  current: number;
  pageSize: number;
  nextPage: string | null;
  prevPage: string | null;
  total: number;
  totalPage: number;
}

export interface ITableProps<T> {
  data: T[];
  pagination: IPagination;
  columns: any[];
  loading?: boolean;
  onPageChange: (pagination: any, filters: any, sorter: any, extra: any) => void;
}

export interface IConfirm extends ChildrenComponent {
  open: boolean;
  type: "success" | "warning" | "error" | "info";
  content?: string;
  okText?: string | "OK";
  cancelText?: string | "Cancel";
  title: string;
  onCancel: () => void;
  onOk: () => Promise<void>;
  children?: React.ReactNode;
}

export interface IProjectRecord extends IProject {}

export interface ICalendarSide {
  data: IProject[] | [];
}

export interface ListDataItem {
  type: BadgeProps["status"];
  content: string;
}

export interface IDetailTask extends ChildrenComponent {
  open: boolean;
  data: ITask | any;
  onShow?: () => void;
  onClose: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  project_id: string;
}

export interface IComment {}

export interface ICreateComment {
  content: string;
  task_id: string;
}

export interface ICreateReplyComment {
  task_id: string;
  comment_id: string;
  content_reply: string;
}

export interface IDocumentDrawerProps {
  open: boolean;
  onClose: () => void;
  onShow?: () => void;
  data: IDocument | any;
}

export interface ITextEditorProps {
  htmlContent: string;
}

export interface INormalNotification {
  id: string;
  content: string;
  is_read: boolean;
  createdAt: string;
}

export interface IInviteNotification {
  key: string;
  from: string;
  message: string;
  status: string;
  task: string;
  created_at: string;
}

export interface INotificationCenterProps {
  open: boolean;
  normalNotifications: IFirebaseData[];
  countNormal: number;
  loadingNormal: boolean;
  countInvite: number;
  inviteNotifications: IFirebaseData[];
  loadingInvite: boolean;
  handlePopoverOpenChange: (visible: boolean) => void;
  loadNormal: () => void;
  loadInvite: () => void;
}

export interface ITaskCollapseItems {
  key: string;
  children: React.ReactNode;
  label: React.ReactNode | string;
}

export interface ITaskCollapseProps {
  type: string | "cancel" | "in-process" | "completed" | "pending" | "close";
  data: ITask[] | any[];
}
