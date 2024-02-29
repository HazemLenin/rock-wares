import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center border-b px-2 md:px-20 h-16">
			<Link href="/" className="text-xl">
				<img src="/Rock Wares Logo Default.jpg" className="dark:hidden w-20" />
				<img
					src="/Rock Wares Logo Dark.jpg"
					className="hidden dark:block w-20"
				/>
			</Link>
			<ModeToggle />
		</nav>
	);
}
