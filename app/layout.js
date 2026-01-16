import "./globals.css";
import { Inter } from "next/font/google";
import Provider2 from "./provider";
import ReduxProvider from "./_components/PersistWrapper";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Prologo AI - AI Logo Maker",
  description: "Create stunning AI-powered logos for your brand",
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-50`}>
        <AuthProvider>
          <ReduxProvider>
            <Provider2>{children}</Provider2>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
