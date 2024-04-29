import createEmblaCarousel from "embla-carousel-solid";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@unpic/solid";
import "./OurStoryCarousel.css";

export interface ImageWithData {
  src: string;
  alt: string;
  caption?: string;
  styleStr?: string;
}
export interface OurStoryCarouselProps {
  imageData: ImageWithData[];
}

export default function OurStoryCarousel({ imageData }: OurStoryCarouselProps) {
  let options = { loop: true, duration: 40 };
  let plugins = [Autoplay({ delay: 4500 })];

  const [emblaRef] = createEmblaCarousel(
    () => options,
    () => plugins
  );

  return (
    <div class="embla lg:rounded-xl" ref={emblaRef}>
      <div class="embla__container">
        {imageData.map((image) => {
          return (
            <div class="embla__slide">
              <Image
                priority
                layout="fullWidth"
                src={image.src}
                alt={image.alt}
                class={`rounded-xl overflow-clip aspect-square`}
              />
              {image.caption ? (
                <p class="text-center text-xl text-pretty">{image.caption}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
