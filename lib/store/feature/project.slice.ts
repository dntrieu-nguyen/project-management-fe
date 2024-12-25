"use client";
import { IDocument } from "@/types/document";
import { IProject } from "@/types/project";
import { IProjectStore } from "@/types/store";
import { setItems } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProjectStore = {
  project: {},
  detailDocument: {},
};

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateDetailProject: (state, action: PayloadAction<IProject | {}>) => {
      const { payload } = action;
      state.project = { ...state.project, ...payload };
      setItems("detailProject", state.project);
    },

    updateDetailDocument: (state, action: PayloadAction<IDocument | {}>) => {
      const { payload } = action;
      state.detailDocument = { ...state.detailDocument, ...payload };
      setItems("detailDocument", state.detailDocument);
    },
  },
});

export const { updateDetailProject, updateDetailDocument } = ProjectSlice.actions;
export default ProjectSlice.reducer;
