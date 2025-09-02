import Image from "next/image";

type Props = {
  image: string;
  title: string;
  artist?: string;
  album?: string;
  genres?: string;
};

const Card = ({ image, title, artist, album, genres }: Props) => {
  return (
    <div className="flex gap-2 bg-(--bg-light) rounded-md shadow-(--shadow)">
      <Image
        src={image}
        alt={title}
        className="rounded-xs"
        height={144}
        width={144}
      />
      <div className="flex flex-col justify-around">
        <span className="text-[var(--text)] font-bold">{title}</span>
        <span className="text-[var(--text)]">{artist}</span>
        {album && <span className="text-[var(--text-muted)]">{album}</span>}
        {genres && <span className="text-[var(--text-muted)]">{genres}</span>}
      </div>
    </div>
  );
};

export default Card;
