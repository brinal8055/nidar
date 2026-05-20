import type { Metadata } from "next";
import "./globals.css";

import { AppShell } from "@/components/app-shell";
import { PageAnalytics } from "@/components/page-analytics";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  metadataBase: new URL("https://nidar.health"),
  title: {
    default: `${siteConfig.shortName} | Hair-loss MVP`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
