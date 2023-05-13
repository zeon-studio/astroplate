import { marked } from "marked";
import { number } from "prop-types";
import React, { useEffect, useRef, useState } from "react";

function Tabs({ children }: { children: any }) {
const [active,setAvtive]=useState(0)

  const tabLinks = Array.from(
    children.props.value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs
    ),
    (match: RegExpMatchArray) => ({ name: match[1], children: match[0] })
  );

  return (
    <div className="tab">
      <ul className="tab-nav">
        {tabLinks.map((item: any, index: number) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active && "active"}`}
            onClick={() =>setAvtive(index) }
          >
            {item.name}
          </li>
        ))}
      </ul>


      {
        tabLinks.map((item,i)=><div className={active===i?"block tab-content px-5":"hidden"} dangerouslySetInnerHTML={{__html:marked.parseInline(item.children)}} />)
      }


    </div>
  );
}

export default Tabs;
