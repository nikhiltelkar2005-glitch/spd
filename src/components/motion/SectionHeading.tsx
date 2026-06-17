import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <FadeIn className="mb-8 px-4 md:px-12 lg:px-16">
      <h2 id={id} className="font-display text-3xl tracking-wide text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-sam-muted md:text-base">{subtitle}</p>}
    </FadeIn>
  );
}
