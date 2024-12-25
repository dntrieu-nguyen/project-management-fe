import { IDocument } from "./document";
import { IProject } from "./project";

export interface IProjectStore {
  project: IProject | {};
  detailDocument: IDocument | {} | any;
}
