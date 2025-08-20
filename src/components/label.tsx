import { LabelHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...props }: Props) => {
  return <label {...props} className="font-bold leading-loose text-(--text-muted)">{children}</label>;
};

export default Label;
