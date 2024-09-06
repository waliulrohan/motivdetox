import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/sidebar/Navigation";


export const metadata = {
  title: "MotivDetox",
  description: "MotivDetox is a ai motivator",
};

export default function RootLayout({ children }) {
  return (
        <div className="w-full h-dvh flex flex-row relative">
          <div className="w-[5rem] h-full">
            <Navigation />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
  );
}
