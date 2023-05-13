import React from "react";

function Tab({ name, children }: { name: string; children: React.ReactNode }) {
  return <div data-name={name}>{children}</div>;
}

export default Tab;
