import request from "@/lib/request/request";
import { ListUserParams, ListUserResponse } from "@/types/user";

export const get_list_user = (data: ListUserParams): Promise<ListUserResponse> =>
  request({
    method: "GET",
    url: "user/list",
    data,
  });
