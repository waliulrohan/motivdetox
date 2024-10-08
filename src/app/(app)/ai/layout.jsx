import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/sidebar/Navigation";
import ChatSidebar from "@/components/ai-chat-components/ChatSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MotiveAI",
  description: "MotiveAI is a ai motivator",
};

export default function AILayout({ children }) {
  return (
    <div className="w-full h-dvh flex flex-row relative bg-gray-900">
      {children}
    </div>
  );
}
