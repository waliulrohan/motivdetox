import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import ChatSidebar from "@/components/ai-chat-components/ChatSidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="w-full h-dvh flex flex-row relative">
          <ChatSidebar />
          <div className="">
            {children}
            </div>
        </div>
      </body>
    </html>
  );
}
