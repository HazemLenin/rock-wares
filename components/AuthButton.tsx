"use client";

import {
	faRightFromBracket,
	faRightToBracket,
	faUser,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link href="/editProfile" className="w-5 text-xl">
							<FontAwesomeIcon icon={faUser} />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Profile</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<button onClick={() => signOut()} className="w-5 text-xl">
							<FontAwesomeIcon icon={faRightFromBracket} />
						</button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Logout</p>
					</TooltipContent>
				</Tooltip>
			</>
		);
	}
	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<button onClick={() => signIn()} className="w-5 text-xl">
						<FontAwesomeIcon icon={faRightToBracket} />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Login</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href="/signup" className="w-5 text-xl">
						<FontAwesomeIcon icon={faUserPlus} />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Signup</p>
				</TooltipContent>
			</Tooltip>
		</>
	);
}
