import request from "@/lib/request/request";

export const get_list_project = () =>
  request({
    method: "GET",
    url: "project/list",
  });
