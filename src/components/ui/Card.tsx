import type { ReactNode } from "react";

interface CardProps {
  /** Small uppercase line above the title (e.g. a date). */
  eyebrow?: string;
  title: string;
  /** Top-right slot, usually one or more badges. */
  badges?: ReactNode;
  children: ReactNode;
  /** Action area shown under a divider. */
  actions?: ReactNode;
}

/** Shared card shell: header with badges, body, and a separated actions area. */
export function Card({ eyebrow, title, badges, children, actions }: CardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden border-brand bg-white">
      <header className="flex items-start justify-between gap-10 bg-brand-black px-15 py-12 text-white">
        <div className="min-w-0">
          {eyebrow && <p className="text-[1.2rem] uppercase text-brand-yellow">{eyebrow}</p>}
          <h3 className="break-all text-[1.8rem] font-medium">{title}</h3>
        </div>
        {badges && <div className="flex shrink-0 flex-wrap justify-end gap-5">{badges}</div>}
      </header>
      <div className="flex flex-1 flex-col gap-12 p-15">{children}</div>
      {actions && <div className="flex flex-col gap-10 bg-brand-yellow/20 p-15">{actions}</div>}
    </article>
  );
}

/** Label above value, for compact fact lists inside a card. */
export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[1.2rem] uppercase text-brand-muted">{label}</p>
      <div className="break-words text-[1.6rem] text-brand-black">{children}</div>
    </div>
  );
}
