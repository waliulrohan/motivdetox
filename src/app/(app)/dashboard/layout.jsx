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
        <div className="w-full h-dvh flex flex-row relative bg-gray-900">
          <div className="w-[3rem] h-full">
            <Navigation />
          </div>
          <div className="flex-1 flex justify-center items-center p-3">
            {children}
          </div>
        </div>
  );
}
