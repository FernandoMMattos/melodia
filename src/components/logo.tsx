import { JSX } from "react";

type Props = {
  tag: keyof JSX.IntrinsicElements;
};

const Logo = ({ tag }: Props) => {
  const Tag = tag;
  return (
    <Tag className="font-extrabold select-none">
      Trackerfy
    </Tag>
  );
};

export default Logo;
