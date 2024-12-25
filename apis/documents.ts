import request from "@/lib/request/request";
import { AllDocuments } from "@/types/document";

export const getAllDocuments = (): Promise<AllDocuments> =>
  request({
    method: "GET",
    url: "project-document/all",
  });
