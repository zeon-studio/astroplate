import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
      rel={`noopener noreferrer ${rel ? (rel === "follow" ? "" : rel) : "nofollow"
        }`}
      className={`btn mb-4 me-4 hover:text-white dark:hover:text-black no-underline ${style === "outline" ? "btn-outline-primary" : "btn-primary"
        }`}
    >
      {label}
    </a>
  );
};

export default Button;
