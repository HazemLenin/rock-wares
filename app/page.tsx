import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<Navbar />
			<Sidebar />
			<main></main>
		</>
	);
}
