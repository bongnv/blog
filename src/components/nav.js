import React from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub } from "react-feather";

import { Links } from "@/types/site-metadata";
import ExternalLink from "./external-link";

const Nav = ({ links }) => (
  <nav className="hidden sm:flex items-center">
    <Link to="/" className="mr-1x" activeClassName="font-bold text-primary">
      About
    </Link>
    <Link
      to="/blog/"
      className="mr-1x"
      activeClassName="font-bold text-primary"
    >
      Blog
    </Link>
    <ExternalLink href={links.linkedin} className="mr-1x">
      <Linkedin />
    </ExternalLink>
    <ExternalLink href={links.github}>
      <GitHub />
    </ExternalLink>
  </nav>
);

Nav.propTypes = {
  links: Links.isRequired,
};

export default Nav;
