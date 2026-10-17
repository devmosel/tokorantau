import { ROUTES } from "@/lib/routes";
import type { Product } from "@/types/api";

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  image: string;
  /** Where the slide's button goes (the product's detail page). */
  href: string;
}

export const HERO_SLIDE_COUNT = 3;

/** Bundled photos used when a product has no image of its own (picked by slide position). */
const FALLBACK_IMAGES = ["/img/pizzaori.png", "/img/burgerori.png", "/img/chickenori.png"];

/** Turns the first products into hero slides. */
export function toHeroSlides(products: Product[]): HeroSlide[] {
  return products.slice(0, HERO_SLIDE_COUNT).map((product, index) => ({
    id: product.id,
    eyebrow: "Order Online",
    title: product.name,
    image: product.images[0] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    href: ROUTES.product(product.id),
  }));
}
