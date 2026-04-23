import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meridian Experts",
  description: "Building consulting and expert analysis",
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
