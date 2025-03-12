import './globals.css';
import { RootProviders } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-gray-700">
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
