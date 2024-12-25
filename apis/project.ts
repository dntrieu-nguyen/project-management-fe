import { PROJECT_URL } from "@/constants/project.const";
import request from "@/lib/request/request";
import { IAddUserToProject, IAllProjectResponse, IParamsProject, IQueryFilterProject } from "@/types/project";
import { ISuccessResponse } from "@/types/response";

export const getAllProjects = (params: IQueryFilterProject = {}): Promise<IAllProjectResponse> =>
  request({
    method: "GET",
    url: PROJECT_URL.GET_ALL,
    params,
  });

export const getAllProjectsByUser = (params: IQueryFilterProject = {}): Promise<IAllProjectResponse> =>
  request({
    method: "GET",
    url: PROJECT_URL.GET_ALL_BY_USER,
    params,
  });

export const deleteProjectById = (params: IParamsProject): Promise<ISuccessResponse> =>
  request({
    method: "DELETE",
    url: PROJECT_URL.DELETE,
    params,
  });

export const addUserToProject = (data: IAddUserToProject): Promise<ISuccessResponse> =>
  request({
    method: "POST",
    url: PROJECT_URL.ADD_USER,
    data,
  });
