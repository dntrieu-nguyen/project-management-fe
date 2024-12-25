import { ISuccessResponse } from "./response";

export interface ITask {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_deleted: string;
  status: "pending" | "in-process" | "completed";
  priority: number;
  due_date: string;
  assignees: string[];
}

export interface IAllTasks extends ISuccessResponse {
  data: {
    project: {
      id: string;
      name: string;
      tasks: ITask[];
    };
  };
}

export interface IQueryTask {
  project_id: string;
}
