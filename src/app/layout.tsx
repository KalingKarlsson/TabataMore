import HamburgerMenu from "@/components/HamburgerMenu";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { InitDB } from "@/db/NeonDB";
import { EXCERCISES } from "@/assets/Contstants";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabata App",
  description: "For my entartainment",
};

// InitDB(EXCERCISES);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <main className="flex min-h-screen flex-col items-center justify-start bg-primary text-white">
          <div className="absolute w-full">
            <HamburgerMenu />
          </div>
          <h1 className=" w-full max-w-[800px] py-8 text-center text-4xl font-light italic lg:text-5xl">Tabata</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
