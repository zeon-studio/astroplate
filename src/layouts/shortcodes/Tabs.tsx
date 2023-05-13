import React, { useEffect, useRef } from "react";

function Tabs({ children }: { children: any }) {
  //select tabItems
  const tabItemsRef = useRef<HTMLDivElement>(null);

  const tabLinks = Array.from(
    children.props.value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>(.*?)<\/div>/gs
    ),
    (match: RegExpMatchArray) => ({ name: match[1], children: match[0] })
  );

  console.log(tabLinks);

  //change tab item on click
  const handleChangTab = (event: any, index: number) => {
    const tabLinks = [...event.currentTarget.parentElement.children];
    const items = [...tabItemsRef.current!.children];
    const activeItem = items.find((item) => !item.classList.contains("hidden"));
    const activeTabLink = tabLinks.find((item) =>
      item.classList.contains("active")
    );
    if (activeItem === items[index]) return;
    activeTabLink.classList.remove("active");
    event.currentTarget.classList.add("active");
    if (activeItem) {
      activeItem.classList.add("hidden");
    }
    items[index].classList.remove("hidden");
  };

  //show first tab-item
  useEffect(() => {
    let allItems = [...tabItemsRef.current!.children];
    allItems[0].classList.remove("hidden");
  }, []);

  return (
    <div className="tab">
      {/* <ul className="tab-nav">
        {tabLinks.map((item: any, index: number) => (
          <li
            key={index}
            className={`tab-nav-item ${index === 0 && "active"}`}
            onClick={(e) => handleChangTab(e, index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="tab-content" ref={tabItemsRef}>
        {children}
      </div> */}
    </div>
  );
}

export default Tabs;
