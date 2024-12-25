"use client";
import { useAppDispatch } from "@/hooks/useStore";
import { updateSavedUser, updateUser } from "@/lib/store/feature/auth.slice";
import { updateDetailProject } from "@/lib/store/feature/project.slice";
import { getItems } from "@/utils/utils";
import React, { useEffect } from "react";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getItems("currentUser");
    const savedUser = getItems("savedUser");
    const detailProject = getItems("detailProject");
    if (savedUser) {
      dispatch(updateSavedUser(savedUser));
    } else {
      dispatch(updateSavedUser(null));
    }

    if (user) {
      dispatch(updateUser(user));
    } else {
      dispatch(updateUser(null));
    }

    if (detailProject) {
      dispatch(updateDetailProject(detailProject));
    } else {
      dispatch(updateDetailProject({}));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthContext;
