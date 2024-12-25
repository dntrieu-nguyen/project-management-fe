import { ISuccessResponse } from "./response";

export interface ICurrentUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  is_staff: boolean;
}

export interface LoginResponse extends ISuccessResponse {
  data: {
    access_token: string;
    refresh_token: string;
    data: ICurrentUser;
  };
}

export interface ListUser {
  id: string;
  email: string;
}

export interface ListUserResponse extends ISuccessResponse {
  data: ListUser[];
}

export interface ListUserParams {
  project_id: string;
}
