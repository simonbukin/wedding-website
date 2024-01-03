"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const CustomImage = ({
  path,
  width,
  height,
  alt,
  priority = false,
}: {
  path: string;
  width: number;
  height: number;
  alt: string;
  priority: boolean;
}) => {
  return (
    <Image
      src={path}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
};

export function EngagementCarousel() {
  const emblaPlugin = Autoplay({
    delay: 4000,
  });

  const imageData = [
    {
      src: "/1.jpg",
      alt: "Simon proposing to Kayla",
      width: 2736,
      height: 1824,
      priority: true,
    },
    {
      src: "/2.jpg",
      alt: "Simon and Kayla laughing and holding hands",
      width: 2736,
      height: 1824,
    },
    {
      src: "/3.jpg",
      alt: "Simon and Kayla laughing during a piggyback ride",
      width: 2736,
      height: 1824,
    },
    {
      src: "/4.jpg",
      alt: "Simon and Kayla hugging next to a tree",
      width: 2736,
      height: 1824,
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
              <CustomImage
                path={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={image.priority ?? false}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
