import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center border-b px-2 md:px-20 h-16">
			<Link href="/" className="text-xl">
				<Image
					src="/Rock Wares Logo Default.jpg"
					alt="Rock Wares Logo"
					className="dark:hidden w-20"
				/>
				<Image
					src="/Rock Wares Logo Dark.jpg"
					alt="Rock Wares Logo"
					className="hidden dark:block w-20"
				/>
			</Link>
			<ModeToggle />
		</nav>
	);
}
