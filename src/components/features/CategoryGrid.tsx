import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { getCategoryIcon } from "@/data/categories";
import { categoryHref } from "@/lib/routes";
import type { Category } from "@/types/api";

/** "Food category" tiles; each inverts to black on hover and filters the menu. */
export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <Section>
      <Title>food category</Title>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(27rem,1fr))] items-start gap-15">
        {categories.map(({ id, name, slug }) => {
          const Icon = getCategoryIcon(slug);
          return (
            <Link
              key={id}
              href={categoryHref(id)}
              className="group block border-brand p-20 text-center hover:bg-brand-black"
            >
              <Icon className="mx-auto text-[10rem] text-brand-black group-hover:invert" />
              <h3 className="my-10 text-[2rem] font-medium capitalize text-brand-black group-hover:text-white">
                {name}
              </h3>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}