import { onCleanup, onMount } from "solid-js";
import PartySocket from "partysocket";
import getOrCreateUserId from "./getOrCreateUserId";

const usePartyKit = ({ host, room, handleMessage }: any) => {
  const userId = getOrCreateUserId();
  const conn = new PartySocket({
    host,
    room,
  });

  const openConnection = () => {
    sendMessage({ type: "ping" });
  };

  const sendMessage = (message: Record<string, any>) => {
    conn.send(JSON.stringify({ ...message, userId }));
  };

  const openMessage = (event: any) => {
    handleMessage(JSON.parse(event.data));
  };

  const onHandleMount = () => {
    conn.addEventListener("open", openConnection);
    conn.addEventListener("message", openMessage);
  };

  const onHandleCleanup = () => {
    conn.removeEventListener("open", openConnection);
    conn.removeEventListener("message", openMessage);
  };

  onMount(onHandleMount);
  onCleanup(onHandleCleanup);

  return { id: conn.id, sendMessage, userId };
};

export default usePartyKit;
