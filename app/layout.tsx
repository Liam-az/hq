import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Building AI tools for students — in public",
  description:
    "I'm 16, a student in Israel. First product ships by September 5, 2026. Follow the build log.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
