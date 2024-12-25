import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

interface WebSocketMessage {
  action: string;
  [key: string]: any;
}

interface WebSocketState {
  sendMessageData: WebSocketMessage[];
  loadMessageData: WebSocketMessage[];
}

export const useWebSocket = (url: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<WebSocketState>({
    sendMessageData: [],
    loadMessageData: [],
  });

  useEffect(() => {
    if (url) {
      const ws = new WebSocket(url);
      setSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);

        // Tách dữ liệu theo action
        if (data.action === "send_message") {
          setData((prev) => ({
            ...prev,
            sendMessageData: [...prev.sendMessageData, data],
          }));
        } else if (data.action === "load_messages") {
          setData((prev) => ({
            ...prev,
            loadMessageData: [...prev.loadMessageData, data],
          }));
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        message.error("WebSocket error occurred");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        message.warning("WebSocket connection closed");
      };

      return () => {
        ws.close();
      };
    }
  }, [url]);

  const sendMessage = useCallback(
    (data: WebSocketMessage) => {
      if (socket && isConnected) {
        socket.send(JSON.stringify(data));
      } else {
        message.warning("WebSocket is not connected.");
      }
    },
    [socket, isConnected],
  );

  return { isConnected, sendMessage, data };
};
