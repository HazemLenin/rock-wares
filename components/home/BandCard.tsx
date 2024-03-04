export default function BandCard({
	id,
	name,
	image,
}: {
	id: number;
	name: string;
	image: string;
}) {
	return (
		<figure className="aspect-square w-full relative">
			<div className="w-full h-full bg-blue-500 md:h-full"></div>
			<figcaption className="band-caption">
				<h2 className="text-2xl font-semibold">{name}</h2>
			</figcaption>
		</figure>
	);
}
