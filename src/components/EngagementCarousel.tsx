"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CldImage } from "next-cloudinary";

const CustomImage = ({
  path,
  width,
  height,
  alt,
  priority = true,
}: {
  path: string;
  width: number;
  height: number;
  alt: string;
  priority: boolean;
}) => {
  return (
    <CldImage
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
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314243/1_tktf21.jpg",
      alt: "Simon proposing to Kayla",
      width: 1920,
      height: 1280,
      priority: true,
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314224/4-1_ajla8p.jpg",
      alt: "Simon and Kayla laughing and holding hands",
      width: 1920,
      height: 1280,
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314236/2_pu1cox.jpg",
      alt: "Simon and Kayla laughing during a piggyback ride",
      width: 1920,
      height: 1280,
    },
    {
      src: "https://res.cloudinary.com/dg0xe8vgc/image/upload/v1704314236/3_srk9fl.jpg",
      alt: "Simon and Kayla hugging next to a tree",
      width: 5472,
      height: 1280,
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
