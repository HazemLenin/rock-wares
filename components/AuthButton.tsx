"use client";

import {
	faRightFromBracket,
	faRightToBracket,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				<button onClick={() => signOut()} className="w-5 text-xl">
					<FontAwesomeIcon icon={faRightFromBracket} />
				</button>
			</>
		);
	}
	return (
		<>
			<button onClick={() => signIn()} className="w-5 text-xl">
				<FontAwesomeIcon icon={faRightToBracket} />
			</button>
			<Link href="/signup" className="w-5 text-xl">
				<FontAwesomeIcon icon={faUserPlus} />
			</Link>
		</>
	);
}
