import "./globals.css";
import { Host_Grotesk } from "next/font/google";
import Provider2 from "./provider";
import ReduxProvider from "./_components/PersistWrapper"; // ✅ Import ReduxProvider (Client Component)
import { ClerkProvider } from "@clerk/nextjs";

const host_grotesk = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Logo Maker",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
   
      <ClerkProvider>
        <html lang="en" >
          <body className={host_grotesk.className}>
            <ReduxProvider> 
              <Provider2 >{children}</Provider2>
            </ReduxProvider>
          </body>
        </html>
      </ClerkProvider>

  );
}
