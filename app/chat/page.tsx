"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, List, Typography, message, Spin } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

interface Message {
  sender: string;
  content: string;
}

const Chat: React.FC = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [senderId, setSenderId] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection established.");
        setIsConnected(true);
      };

      if (isConnected) {
        loadMessages();
      }

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        message.error("WebSocket error occurred");
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
        setIsConnected(false);
        setMessages([]);
        message.warning("WebSocket connection closed");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleSocketMessage(data);
      };
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handleSocketMessage = async (data: any) => {
    if (data.action === "send_message") {
      setMessages((prevMessages) => [...prevMessages, { sender: data.message.sender, content: data.message.content }]);
    } else if (data.action === "load_messages") {
      setIsLoading(false);
      if (data.messages.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => [...prevMessages, ...data.messages]);
        setOffset((prevOffset) => prevOffset + data.messages.length);
      }
    } else if (data.error) {
      setIsLoading(false);
      message.error(data.error);
    }
  };

  const connectWebSocket = async () => {
    if (roomName && senderId) {
      const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/?id=${senderId}`);
      setSocket(newSocket);
    } else {
      message.warning("Please enter both Room Name and Sender ID.");
    }
  };

  const sendMessage = async () => {
    if (socket && messageContent && isConnected) {
      try {
        await new Promise((resolve, reject) => {
          socket.send(
            JSON.stringify({
              action: "send_message",
              content: messageContent,
              sender_id: senderId,
            }),
          );
          resolve(true);
        });
        setMessageContent("");
      } catch (error) {
        message.error("Failed to send message");
      }
    } else {
      message.warning("Please connect to the WebSocket and enter a message.");
    }
  };

  const loadMessages = async () => {
    if (socket && isConnected && hasMore && !isLoading) {
      setIsLoading(true);
      try {
        await new Promise((resolve, reject) => {
          socket.send(
            JSON.stringify({
              action: "load_messages",
              offset: offset,
              limit: 10,
            }),
          );
          resolve(true);
        });
      } catch (error) {
        setIsLoading(false);
        message.error("Failed to load messages");
      }
    } else if (!hasMore) {
      message.info("No more messages to load.");
    } else if (isLoading) {
      message.info("Messages are being loaded...");
    } else {
      message.warning("Please connect to the WebSocket first.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Sender ID (UUID)"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={connectWebSocket} style={{ marginBottom: "10px" }}>
        Connect
      </Button>

      <div style={{ marginBottom: "10px" }}>
        <TextArea
          rows={4}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Enter your message..."
        />
        <Button type="primary" onClick={sendMessage} style={{ marginTop: "10px" }}>
          Send
        </Button>
        <Button onClick={loadMessages} style={{ marginTop: "10px", marginLeft: "10px" }}>
          {isLoading ? "Loading..." : "Load Messages"}
        </Button>
      </div>

      {isLoading && (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <Spin tip="Loading messages..." />
        </div>
      )}

      <List
        header={<div>Messages</div>}
        bordered
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.sender}:</strong> {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Chat;
