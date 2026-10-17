import type { ElementType, FormHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PanelProps = HTMLAttributes<HTMLElement> &
  Pick<FormHTMLAttributes<HTMLFormElement>, "action" | "method"> & {
    as?: ElementType;
  };

/** A bordered box with 2rem padding (the mockup's `.box` / form card). */
export function Panel({ as: Tag = "div", className, children, ...rest }: PanelProps) {
  return (
    <Tag className={cn("border-brand p-20", className)} {...rest}>
      {children}
    </Tag>
  );
}
