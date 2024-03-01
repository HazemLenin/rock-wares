import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import AuthProvider from "./context/AuthProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rock Wares",
	description: "Wear the Beat, Live the Riff!",
};

export default function RootLayout({
	children,
	session,
}: Readonly<{
	children: React.ReactNode;
	session: Session;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider session={session}>
						<Navbar />
						<Sidebar />
						<div className="pb-24 md:pb-0">
							<main className="mb-10">{children}</main>
							<footer className="text-muted text-center py-2 border-t">
								Hazem Lenin @ 2024
							</footer>
						</div>
						<ToastContainer />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
