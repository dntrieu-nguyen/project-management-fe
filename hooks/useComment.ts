"use client";
import React, { useState, useCallback } from "react";
import useFirebase from "./useFirebase";
import { convertObjectToArray } from "@/utils/utils";

interface Comment {
  id: string;
  author: string;
  content: string;
  datetime: string;
  parentId?: string;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { data, loading, loadMore } = useFirebase({
    endpoint: "4f192afedb154164b44b43836420b823",
    path: "comments",
  });

  const test = useFirebase({
    endpoint: "",
    path: "comments",
  });

  // Thêm bình luận mới
  const addComment = useCallback((content: string, author: string, parentId?: string) => {
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      author,
      content,
      datetime: new Date().toLocaleString(),
      parentId,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  }, []);

  // Lấy các bình luận con của một bình luận
  const getReplies = useCallback(
    (parentId: string) => {
      return comments.filter((comment) => comment.parentId === parentId);
    },
    [comments],
  );

  return { comments, addComment, getReplies };
};
