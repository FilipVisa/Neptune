import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neptune — AI-Powered Software for Modern Business",
  description:
    "Neptune builds AI-powered tools, custom websites, booking systems, and intelligent automation for small and medium businesses ready to scale.",
  keywords: "AI software, custom websites, AI chatbots, booking systems, CRM, SMB software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
