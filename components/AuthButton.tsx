"use client";

import {
	faRightFromBracket,
	faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";

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
		</>
	);
}
