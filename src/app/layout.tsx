import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://meridianexperts.com"),
  title: {
    default: "Meridian Experts — Litigation-Grade Building Analysis",
    template: "%s — Meridian Experts",
  },
  description:
    "Boutique building consultants for attorneys. Litigation-grade failure analysis, court-ready reports, and expert witness testimony for construction defect and insurance disputes.",
  openGraph: {
    title: "Meridian Experts — Litigation-Grade Building Analysis",
    description:
      "Expert building consultants retained by counsel in construction defect, insurance, and structural failure matters.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
