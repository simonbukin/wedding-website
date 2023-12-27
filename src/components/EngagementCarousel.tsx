"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export function EngagementCarousel() {
  return (
    <Carousel
      className="order-2 my-4 sm:m-0"
      opts={{
        loop: true,
        duration: 40,
        speed: 40,
        align: "center",
        containScroll: false,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Image
            src="/1.jpg"
            alt="Simon proposing to Kayla"
            width={5472}
            height={3648}
            className="rounded-none sm:rounded-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/2.jpg"
            alt="Simon and Kayla laughing and holding hands"
            width={5472}
            height={3648}
            className="rounded-none sm:rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/3.jpg"
            alt="Simon and Kayla laughing during a piggyback ride"
            width={5472}
            height={3648}
            className="rounded-none sm:rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/4.jpg"
            alt="Simon and Kayla hugging next to a tree"
            width={5472}
            height={3648}
            className="rounded-none sm:rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
