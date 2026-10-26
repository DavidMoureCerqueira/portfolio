interface Props {
  src: string;
  alt: string;
}

export function ProfileImage({ src, alt }: Props) {
  return (
    <div className="avatar">
      <div className="w-32 rounded-lg">
        <img className="object-top" src={src} alt={alt} />
      </div>
    </div>
  );
}
