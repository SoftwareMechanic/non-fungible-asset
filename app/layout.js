import { Inter } from "next/font/google";
import "./globals.css";

import BlockchainWallet from "./components/BlockchainWallet/BlockchainWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Non Fungible Asset",
  description: "dApp for construction projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <BlockchainWallet>
        {children}
      </BlockchainWallet>
      </body>
    </html>
  );
}
