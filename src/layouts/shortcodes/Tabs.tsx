import { marked } from "marked";
import React, { useState } from "react";

function Tabs({ children }: { children: any }) {
  const [active, setAvtive] = useState(0);

  const tabItems = Array.from(
    children.props.value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs
    ),
    (match: RegExpMatchArray) => ({ name: match[1], children: match[0] })
  );

  return (
    <div className="tab">
      <ul className="tab-nav">
        {tabItems.map((item: any, index: number) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active && "active"}`}
            onClick={() => setAvtive(index)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabItems.map((item, i) => (
          <div
            className={`tab-content-panel ${
              active === i ? "active" : "hidden"
            }`}
            dangerouslySetInnerHTML={{
              __html: marked.parse(item.children),
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Tabs;
