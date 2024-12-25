import { NextApiRequest, NextApiResponse } from "next";

export interface IError {
  success: boolean;
  data: string[] | null;
  message: string;
}

export type Middleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => void;
