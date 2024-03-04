import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInfoCircle,
	faRightToBracket,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import AuthButton from "./AuthButton";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

export default function Sidebar() {
	return (
		<aside className="fixed flex md:flex-col justify-evenly items-center border-t md:border-t-0 md:border-r h-20 w-full md:h-full md:w-20 bottom-0 bg-background z-50">
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href="/search" className="w-5 text-xl">
						<FontAwesomeIcon icon={faSearch} />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Search</p>
				</TooltipContent>
			</Tooltip>
			<AuthButton />
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href="/about" className="w-5 text-xl">
						<FontAwesomeIcon icon={faInfoCircle} />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>About</p>
				</TooltipContent>
			</Tooltip>
		</aside>
	);
}
