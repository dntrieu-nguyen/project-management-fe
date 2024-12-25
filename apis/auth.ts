import { IResponse, ISuccessResponse } from "@/types/response";
import { IAuth } from "./../types/index";
import request from "@/lib/request/request";
import { ILogout } from "@/types/auth";

export const login = (data: IAuth) =>
  request({
    method: "POST",
    data: data,
    url: "auth/login",
  });

export const logout = (data: ILogout): Promise<IResponse> =>
  request({
    method: "POST",
    url: "auth/logout",
    data,
  });
