import { Link } from "gatsby";
import React, { useState } from "react";
import { Menu, X } from "react-feather";

import { Metadata } from "@/types/site-metadata";
import Nav from "./nav";
import MobileNav from "./mobile-nav";

const Header = ({ siteMetadata }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleClick = () => setMenuVisible(!menuVisible);
  const BtnIcon = menuVisible ? X : Menu;

  return (
    <header className="fixed top-0 z-10 w-full bg-background font-display">
      <div className="container max-w-outer px-1x">
        <div className="flex justify-between items-center border-b py-.5x">
          <Link
            className="tracking-tighter text-black text-xl sm:text-2xl font-bold"
            to="/"
          >
            {siteMetadata.title}
          </Link>
          <Nav links={siteMetadata.links} />
          <button
            type="button"
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

Header.propTypes = {
  siteMetadata: Metadata.isRequired,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
