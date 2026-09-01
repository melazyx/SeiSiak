export default function BenefitsRow({ items }) {
  const colorMap = {
    primary:
      "bg-primary-light text-primary",

    secondary:
      "bg-secondary-light text-secondary",

    accent:
      "bg-accent-light text-accent-dark",
  };

  return (
    <div className="
      bg-white
      rounded-3xl
      border
      border-line
      shadow-soft
      p-4
      sm:p-5
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-2
    ">

      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              hover:bg-cream
              transition-colors
            "
          >

            <div
              className={`
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                shrink-0
                ${colorMap[item.color]}
              `}
            >
              <Icon size={19} />
            </div>

            <div>
              <p className="
                text-sm
                font-bold
                text-ink
              ">
                {item.title}
              </p>

              <p className="
                text-xs
                text-muted
                mt-0.5
              ">
                {item.desc}
              </p>
            </div>

          </div>
        );
      })}

    </div>
  );
}