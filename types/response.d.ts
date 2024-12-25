export interface IResponse {
  message: string;
  success: boolean;
  data: T[] | null;
}
export interface ISuccessResponse extends IResponse {
  success: true;
}

export interface IErrorResponse extends IResponse {
  success: false;
}

export interface IPagination {
  page_size: number;
  page: number;
  next: string | null;
  previous: string | null;
  total: number;
  total_pages: number;
  current?: number;
}
