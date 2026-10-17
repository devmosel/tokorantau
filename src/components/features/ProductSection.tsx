import type { ReactNode } from "react";
import { ProductGrid } from "@/components/features/ProductGrid";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";

interface ProductSectionProps {
  /** Omit to render a title-less section (e.g. empty search results). */
  title?: string;
  /** Rendered between the title and the grid (e.g. the cart total). */
  intro?: ReactNode;
  /** Replaces the grid when there is nothing to show. */
  empty?: ReactNode;
  /** Rendered centred below the grid (e.g. a "view all" button). */
  footer?: ReactNode;
  className?: string;
  /** Product cards. */
  children?: ReactNode;
}

/** The shared "title + grid of product cards" block of home, menu, search and cart. */
export function ProductSection({ title, intro, empty, footer, className, children }: ProductSectionProps) {
  return (
    <Section className={className}>
      {title && <Title>{title}</Title>}
      {intro}
      {empty ?? <ProductGrid>{children}</ProductGrid>}
      {footer && <div className="mt-30 text-center">{footer}</div>}
    </Section>
  );
}
