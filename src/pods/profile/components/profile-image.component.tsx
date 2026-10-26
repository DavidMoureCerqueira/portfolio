interface Props {
  src: string;
  alt: string;
}

// Esquinas en L como las marcas de registro de un plano
const marks = [
  "-top-3 -left-3 border-t border-l",
  "-top-3 -right-3 border-t border-r",
  "-bottom-3 -left-3 border-b border-l",
  "-bottom-3 -right-3 border-b border-r",
];

export function ProfileImage({ src, alt }: Props) {
  return (
    <div className="relative w-56 shrink-0 sm:w-64 lg:w-72">
      {marks.map((position) => (
        <span
          key={position}
          className={`absolute size-3 border-line-strong ${position}`}
          aria-hidden="true"
        />
      ))}
      <div className=" aspect-4/5 overflow-hidden rounded-lg">
        <img className="size-full object-cover object-top" src={src} alt={alt} />
      </div>
    </div>
  );
}
