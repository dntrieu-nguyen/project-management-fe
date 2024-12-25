import { TASK_URL } from "@/constants/tasks.const";
import { IAllTasks, IQueryTask } from "@/types/task";
import request from "@/lib/request/request";
import { IAcceptOrDeclineProps } from "@/types/notification";
import { IResponse } from "@/types/response";

export const getAllTasksByProjectID = (params: IQueryTask): Promise<IAllTasks> =>
  request({
    method: "GET",
    url: TASK_URL.GET_ALL_BY_PRJ_ID,
    params,
  });

export const acceptInvitation = (data: IAcceptOrDeclineProps): Promise<IResponse> =>
  request({
    method: "POST",
    url: "tasks/accept",
    data,
  });

export const declineInvitation = (data: IAcceptOrDeclineProps): Promise<IResponse> =>
  request({
    method: "POST",
    url: "tasks/decline",
    data,
  });
