export default function SectionHeading({
  blueWord,
  redWord,
  subtitle,
  align = "left",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`
        flex
        flex-col
        gap-2
        ${isCenter ? "items-center text-center" : "items-start text-left"}
      `}
    >

      {/* Brand stripe */}
      <div className="flex items-center gap-1">
        <div className="
          w-8
          h-1
          rounded-full
          bg-primary
        " />

        <div className="
          w-5
          h-1
          rounded-full
          bg-secondary
        " />

        <div className="
          w-3
          h-1
          rounded-full
          bg-accent
        " />
      </div>

      <h2 className="
        font-heading
        font-extrabold
        text-3xl
        sm:text-4xl
        leading-tight
      ">
        <span className="text-secondary">
          {blueWord}
        </span>

        {" "}

        <span className="text-primary">
          {redWord}
        </span>
      </h2>

      {subtitle && (
        <p className="
          text-sm
          sm:text-base
          text-muted
          max-w-xl
        ">
          {subtitle}
        </p>
      )}

    </div>
  );
}