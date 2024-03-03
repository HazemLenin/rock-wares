"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

export default function banner() {
	return (
		<Carousel opts={{ loop: true }} plugins={[AutoPlay({ delay: 3000 })]}>
			<CarouselContent>
				<CarouselItem key={1}>
					<div className="w-full h-[40vh] bg-blue-500">hello</div>
				</CarouselItem>
				<CarouselItem key={2}>
					<div className="w-full h-[40vh] bg-green-500">hello</div>
				</CarouselItem>
				<CarouselItem key={3}>
					<div className="w-full h-[40vh] bg-red-500">hello</div>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	);
}
