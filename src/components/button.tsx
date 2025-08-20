import { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, type = "button", ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      className="p-4 items-center flex rounded-2xl cursor-pointer place-self-center bg-(--primary) text-(--text) hover:bg-(--secondary) transition-colors duration-300 w-full justify-center"
    >
      {children}
    </button>
  );
};

export default Button;
