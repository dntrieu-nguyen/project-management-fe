import { ISuccessResponse } from "./response";

interface owner {
  id: string;
  email: string;
}

interface project_id {
  id: string;
  name: string;
}

export interface IDocument {
  id: string;
  name: string;
  description: string;
  owner: {
    id: string;
    email: string;
  };
  project_id: {
    id: string;
    name: string;
  };
  updated_at: string;
  created_at: string;
}

export interface AllDocuments extends ISuccessResponse {
  data: IDocument[];
}
