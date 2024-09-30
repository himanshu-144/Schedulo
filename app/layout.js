import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "../components/Header";
import CreateEventDrawer from "../components/CreateEvent"

export const metadata = {
  title: "Schedulo",
  description: "Meeting Scheduling App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white`}
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="py-8 bg-gray-900">
            <div className="container mx-auto px-4 text-center text-white">
              Made by Himanshu
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
