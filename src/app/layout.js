"use client";

import "./globals.css";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>{children}</BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
