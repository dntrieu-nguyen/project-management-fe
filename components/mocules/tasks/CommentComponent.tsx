import React, { useState } from "react";
import { Avatar, Typography, Input, Button, Card } from "antd";
import { useComments } from "@/hooks/useComment";
import { Comment } from "@ant-design/compatible";
import { SendOutlined } from "@ant-design/icons";

const CommentComponent: React.FC = () => {
  const { comments, addComment, getReplies } = useComments();
  const [replyContent, setReplyContent] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Xử lý thêm bình luận
  const handleAddComment = () => {
    if (replyContent.trim()) {
      addComment(replyContent, "Han", replyingTo || undefined);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  // Hiển thị bình luận theo kiểu nested
  const renderComments = (parentId?: string) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <Comment
          key={comment.id}
          actions={[
            <span key="reply" onClick={() => setReplyingTo(comment.id)}>
              Reply
            </span>,
          ]}
          author={<Typography.Text strong>{comment.author}</Typography.Text>}
          avatar={<Avatar size="small" src={`${process.env.NEXT_PUBLIC_ICON_SVG}1`} alt="Avatar" />}
          content={<Typography.Text>{comment.content}</Typography.Text>}
          datetime={comment.datetime}
        >
          {renderComments(comment.id)}
        </Comment>
      ));
  };

  return (
    <>
      <div>
        {<Card className="w-full h-96 overflow-y-auto border border-spacing-1 p-2 rounded-md">{renderComments()}</Card>}
        <div style={{ marginBottom: 16, position: "relative" }}>
          {replyingTo && <Typography.Text>Replying to comment ID: {replyingTo}</Typography.Text>}
          <div className="relative w-full">
            <Input.TextArea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={2}
              placeholder="Write a comment..."
              style={{ paddingRight: 40, marginTop: "10px" }}
            />
            <Button
              type="link"
              onClick={handleAddComment}
              style={{ position: "absolute", right: "1px", bottom: "1px", top: "20px" }}
            >
              <SendOutlined style={{ fontSize: "25px", color: "gray" }} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentComponent;
