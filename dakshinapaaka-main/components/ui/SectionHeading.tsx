interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-16 text-center">

      {subtitle && (
        <p className="mb-3 uppercase tracking-[5px] text-green-700 font-medium">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold text-[#181818]">
        {title}
      </h2>

    </div>
  );
}