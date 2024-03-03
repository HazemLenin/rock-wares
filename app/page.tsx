import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Banner from "@/components/home/Banner";
import ProductCard from "@/components/ProductCard";
import { map } from "zod";

const products = [
	{
		id: 1,
		name: "Product 1",
		image: "image 1",
		price: 300,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate commodo convallis. Maecenas eget finibus eros. Fusce eu pellentesque libero.",
	},
	{
		id: 2,
		name: "Product 2",
		image: "image 2",
		price: 300,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate commodo convallis. Maecenas eget finibus eros. Fusce eu pellentesque libero.",
	},
	{
		id: 3,
		name: "Product 3",
		image: "image 3",
		price: 300,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate commodo convallis. Maecenas eget finibus eros. Fusce eu pellentesque libero.",
	},
	{
		id: 4,
		name: "Product 4",
		image: "image 4",
		price: 300,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate commodo convallis. Maecenas eget finibus eros. Fusce eu pellentesque libero.",
	},
	{
		id: 5,
		name: "Product 5",
		image: "image 5",
		price: 300,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate commodo convallis. Maecenas eget finibus eros. Fusce eu pellentesque libero.",
	},
];

export default function Home() {
	return (
		<>
			<section className="h-[40vh] mb-5">
				<Banner />
			</section>

			<section>
				<h1 className="text-4xl font-semibold text-center mb-5">Featured</h1>
				<div className="ml-2 md:ml-10">
					<Carousel opts={{ loop: true }} className="w-2/3 mx-auto">
						<CarouselContent>
							{products.map((product) => (
								<CarouselItem className="md:basis-1/2" key={product.id}>
									<ProductCard {...product} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</section>
		</>
	);
}
