import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KnowWhatYouKnow — Paste notes, get quizzed",
  description:
    "Paste your study notes and get an instant AI quiz that shows what you actually remember.",
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

