"use client";

import { Button } from "@/components/ui/Button";

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-20 p-40 text-center">
      <p className="text-[2.5rem] text-brand-black">Something went wrong. Please try again.</p>
      <Button type="button" onClick={reset}>
        try again
      </Button>
    </div>
  );
}
