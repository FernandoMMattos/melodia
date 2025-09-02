import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-6 text-center text-(--text) bg-(--primary)">
      Created by{" "}
      <Link
        href="https://github.com/FernandoMMattos"
        className="hover:text-blue-500"
      >
        FernandoMMattos
      </Link>
    </footer>
  );
};

export default Footer;
