import type { Metadata } from "next";
import "./globals.css";
import "./forest.css";

export const metadata: Metadata = {
  title: "Egoole | Grain price watch",
  description: "Trusted grain-market prices across Nigeria."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
