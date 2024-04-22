import createEmblaCarousel from "embla-carousel-solid";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@unpic/solid";
import "./Carousel.css";

export default function Carousel() {
  let options = { loop: true, duration: 40 };
  let plugins = [Autoplay({ delay: 4500 })];

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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
