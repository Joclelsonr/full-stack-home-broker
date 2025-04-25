import { io } from "socket.io-client";

// const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;

export const socket = io("http://localhost:3000", {
  autoConnect: false,
});
