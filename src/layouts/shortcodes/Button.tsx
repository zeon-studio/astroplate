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
  children: any;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn mb-4 me-4 ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      } border-primary hover:text-white hover:no-underline`}
    >
      {children}
    </a>
  );
};

export default Button;
