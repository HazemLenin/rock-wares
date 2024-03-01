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

export default function Sidebar() {
	return (
		<aside className="fixed flex md:flex-col justify-evenly items-center border h-20 w-full md:h-full md:w-20 bottom-0 bg-background">
			<Link href="/search" className="w-5 text-xl">
				<FontAwesomeIcon icon={faSearch} color="white" />
			</Link>
			<AuthButton />
			<Link href="/about" className="w-5 text-xl">
				<FontAwesomeIcon icon={faInfoCircle} color="white" />
			</Link>
		</aside>
	);
}
