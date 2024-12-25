import request from "@/lib/request/request";
import { ISendNotificationResponseSuccess, ISendNotificationRequestBody } from "@/types/notification";

export const seenNotify = (params: any) => {
  return request({
    method: "PATCH",
    url: "notification/update-status",
    params,
  });
};

export const sendInvitation = (data: ISendNotificationRequestBody): Promise<ISendNotificationResponseSuccess> =>
  request({
    method: "POST",
    url: "tasks/send-invite",
    data,
  });

export const accept = (data: any) =>
  request({
    method: "POST",
    url: "tasks/accept",
    data,
  });
