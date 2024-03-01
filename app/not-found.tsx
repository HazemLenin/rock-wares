import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center gap-10 h-screen">
			<h1 className="text-4xl font-bold">Got Lost?</h1>
			<p>
				Go to{" "}
				<Link href="/" className="underline">
					home
				</Link>{" "}
				again!
			</p>
		</div>
	);
}
