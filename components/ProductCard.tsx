export default function ProductCard({
	id,
	name,
	description,
	price,
}: {
	id: number;
	name: string;
	description: string;
	price: number;
}) {
	return (
		<figure className="h-80 relative">
			<div className="w-full h-40 bg-blue-500 md:h-full"></div>
			<figcaption className="product-caption">
				<h2 className="text-2xl font-semibold">{name}</h2>
				<p className="hidden md:block text-sm">{description}</p>
				<p className="font-light text-end w-full">{price} EGP</p>
			</figcaption>
		</figure>
	);
}
