import { ReactNode } from "react";

interface GridViewBlockProps {
  headline: ReactNode;
  id?: string;
  children: ReactNode;
}

export function GridViewBlock({ id, headline, children }: GridViewBlockProps) {
  return (
    <div id={id}>
      <h2 className="font-serif font-black text-neutral-800 tracking-tight text-6xl md:text-8xl lg:text-7xl">
        {headline}
      </h2>
      <div className="mt-16">{children}</div>
    </div>
  );
}
