import React from "react";

const Button = ({
  href,
  style,
  rel,
  children,
}: {
  href: string;
  style: string | null;
  rel: string | null;
  children: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 hover:text-white hover:no-underline ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {children}
    </a>
  );
};

export default Button;
