"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@unpic/react";

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      aspectRatio={3 / 2}
      background="transparent"
      layout="fullWidth"
      priority={true}
    />
  );
};

export function EngagementCarousel() {
  const emblaPlugin = Autoplay({
    delay: 4000,
  });

  const imageData = [
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314243/1_tktf21.jpg",
      alt: "Simon proposing to Kayla",
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314224/4-1_ajla8p.jpg",
      alt: "Simon and Kayla laughing and holding hands",
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314236/2_pu1cox.jpg",
      alt: "Simon and Kayla laughing during a piggyback ride",
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314236/3_srk9fl.jpg",
      alt: "Simon and Kayla hugging next to a tree",
    },
  ];

  return (
    <Carousel
      className="pointer-events-none order-2 my-4 overflow-clip rounded-none sm:m-0 sm:rounded-2xl"
      opts={{
        loop: true,
        duration: 40,
        speed: 40,
        align: "center",
        containScroll: false,
      }}
      plugins={[emblaPlugin]}
    >
      <CarouselContent>
        {imageData.map((image) => {
          return (
            <CarouselItem key={image.src}>
              <CustomImage src={image.src} alt={image.alt} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
