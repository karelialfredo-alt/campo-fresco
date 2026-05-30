import { theme } from "../assets/theme";

export default function Notification({ message }) {
  if (!message) return null;
  return <div className="notif">{message}</div>;
}