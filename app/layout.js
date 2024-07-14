import { Inter } from "next/font/google";
import "./globals.css";
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProjectItemsProvider } from "@/context/ProjectItemsContext";
//import "bootstrap/dist/css/bootstrap.min.css";
import BlockchainWallet from "./components/BlockchainWallet/BlockchainWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Non Fungible Asset",
  description: "dApp for construction projects",
};

export default function RootLayout({ children }) {

  const initialProjects = [
    { id: '1', name: 'Project One', description: 'Description of Project One' },
    { id: '2', name: 'Project Two', description: 'Description of Project Two' },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectsProvider initialProjects={initialProjects}>
          <ProjectItemsProvider initialProjectItems={[]}>
            <BlockchainWallet>
              {children}
            </BlockchainWallet>
          </ProjectItemsProvider>
        </ProjectsProvider>
      </body>
    </html>
  );
}
