"use client";

import "./globals.css";
import RootStore, { RootStoreContext } from "./_lib/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
        // className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      >
        <RootStoreContext.Provider value={RootStore}>
          {children}
        </RootStoreContext.Provider>
      </body>
    </html>
  );
}
