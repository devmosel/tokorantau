import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";

/** GET form: submitting navigates to /search?q=... so results are server-rendered. */
export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <Section>
      <form action={ROUTES.search} className="flex gap-10">
        <Input
          fieldSize="search"
          type="text"
          name="q"
          defaultValue={defaultValue}
          placeholder="search here..."
          aria-label="Search"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex w-60 cursor-pointer items-center justify-center bg-brand-black text-[1.8rem] text-white transition-all duration-200 hover:bg-brand-yellow hover:text-brand-black hover:opacity-85"
        >
          <FaSearch />
        </button>
      </form>
    </Section>
  );
}