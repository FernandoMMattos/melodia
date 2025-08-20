import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ type = "text" }: Props) => {
  return (
    <input type={type} className="p-3 border border(--border-muted) text(--text) rounded-xl outline-0" />
  );
};

export default Input;
