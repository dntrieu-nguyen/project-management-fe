import { ISuccessResponse } from "./response.d";
export interface ISendNotificationRequestBody {
  task_id: string;
  receiver_id: string;
  project_id: string;
}

export interface ISendNotificationResponseSuccess extends ISuccessResponse {}

export interface IAcceptOrDeclineProps {
  invitation_id: string;
  task_id: string;
  project_id: string;
}

export interface IAcceptInvitationResponseSuccess extends ISuccessResponse {}
