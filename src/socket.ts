import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const getSocket = () => {
  return io(URL, {
    // path: '/socket.io',
    reconnectionAttempts: 5,     // Attempt to reconnect 5 times
    reconnectionDelay: 2000,
  });
};
