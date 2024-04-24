import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Modules/Navbar/Navbar";
import Footer from "@/Components/Modules/Footer/Footer";
import ScrollToTop from "@/utils/scrollToTop/scrollToTop";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "AzizKala",
  description: "AzizKala shopping",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div>
          <div className="pr-[7.7vw]  2xl:pr-[10vw] 2xl:pl-[10vw] pl-[7.7vw]">
            <Navbar />
            <main>{children}</main>
            <div className="lg:bottom-[20px] lg:left-[30px] bottom-[15px] left-[15px] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] cursor-pointer fixed">
              <ScrollToTop />
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
