import { IPagination, ISuccessResponse } from "./response";

export type Tab = "LIST" | "CALENDAR";

export interface IProject {
  id: string;
  description: string | "";
  name: string;
  owner: string;
  status: string;
  updated_at: string;
  created_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
  members: string[];
}

export interface IAllProjectResponse extends ISuccessResponse {
  data: IProject[];
  pagination: IPagination | undefined;
}

export interface IParamsProject {
  project_id?: string;
}

export interface IQueryFilterProject extends IParamsProject {
  name?: string;
  status?: string;
  owner?: string;
  members?: string;
  created_at?: string;
  page?: number;
}

export interface IAddUserToProject extends IParamsProject {
  members: string;
  project_id: string;
}
