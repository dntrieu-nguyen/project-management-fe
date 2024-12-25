import request from "@/lib/request/request";
import { ICreateComment, ICreateReplyComment } from "@/types/components";

export const createComment = (data: ICreateComment) =>
  request({
    method: "POST",
    url: "comment/create",
    data,
  });

export const createReplyComment = (data: ICreateReplyComment) =>
  request({
    method: "POST",
    url: "comment/create-reply-comment",
    data,
  });
