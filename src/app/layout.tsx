import "./globals.css";
import { RootProviders } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-50">
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
