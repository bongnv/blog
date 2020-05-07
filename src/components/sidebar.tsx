import React, { useState, useEffect, FC } from "react";

import classNames from "@/utils/class-names";
import getFirstHeading from "@/utils/get-first-heading";
import { Heading } from "@/types";

const WAITING_IN_MS = 100;

const sideBarEffect = (
  headings: Array<Heading>,
  setActiveAnchor: Function,
): (() => void) => {
  const anchors = headings.map((heading) => {
    const el = document.getElementById(heading.id);

    return {
      anchor: heading.id,
      offsetTop: el ? el.offsetTop : -1,
    };
  });

  let busy = false;
  const handleScroll = (): void => {
    if (!busy) {
      busy = true;
      setTimeout(() => {
        setActiveAnchor(
          getFirstHeading(window.scrollY, window.innerHeight, anchors),
        );
        busy = false;
      }, WAITING_IN_MS);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (): void => {
    window.removeEventListener("scroll", handleScroll);
  };
};

interface SideBarProps {
  headings: Array<Heading>;
}

const SideBar: FC<SideBarProps> = ({ headings }: SideBarProps) => {
  const [activeAnchor, setActiveAnchor] = useState("");
  useEffect(() => sideBarEffect(headings, setActiveAnchor), [headings]);

  return (
    <div className="top-4x sticky font-display border-l pl-1x mt-2x ml-1x">
      <h3 className="font-bold tracking-wide uppercase mb-.5x pb-.5x border-b">
        On this page
      </h3>
      <ul>
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <a
              className={classNames({
                "flex text-sm transition transform hover:translate-x-1": true,
                "mt-1x": index > 0 && heading.depth === 2,
                "mt-.5x": index === 0 || heading.depth !== 2,
                "font-semibold": heading.depth === 2,
                "font-bold text-primary": activeAnchor === heading.id,
                "pl-1x": heading.depth === 3,
              })}
              href={`#${heading.id}`}
            >
              {heading.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
