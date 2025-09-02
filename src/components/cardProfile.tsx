import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const CardProfile = ({ title, children }: Props) => {
  return (
    <div className="bg-(--bg-light) rounded-2xl shadow-md p-6">
      <h2 className="font-semibold mb-2 text-(--text)">{title}</h2>
      {children}
    </div>
  );
};

export default CardProfile;
