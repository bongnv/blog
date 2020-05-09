import { Link } from "gatsby";
import React, { useState, FC } from "react";
import { Menu, X } from "react-feather";

import { Metadata } from "@/types";
import Nav from "./nav";
import MobileNav from "./mobile-nav";

interface HeaderProps {
  siteMetadata: Metadata;
}

const Header: FC<HeaderProps> = ({ siteMetadata }: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleClick = (): void => setMenuVisible(!menuVisible);
  const BtnIcon = menuVisible ? X : Menu;
  return (
    <header className="fixed top-0 z-10 w-screen bg-background font-display">
      <div className="container max-w-outer px-1x">
        <div className="flex justify-between items-center border-b  border-divider py-.5x">
          <Link
            className="tracking-tighter text-xl sm:text-2xl font-bold"
            to="/"
          >
            {siteMetadata.title}
          </Link>
          <Nav links={siteMetadata.links} />
          <button
            className="sm:hidden focus:outline-none"
            onClick={handleClick}
          >
            <BtnIcon className="sm:hidden" />
          </button>
        </div>
      </div>
      {menuVisible && <MobileNav links={siteMetadata.links} />}
    </header>
  );
};

export default Header;
