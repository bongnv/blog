import React from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub } from "react-feather";

import { Links } from "@/types/site-metadata";
import ExternalLink from "./external-link";

const MobileNav = ({ links }) => (
  <nav className="flex flex-col justify-start px-1x border-b shadow">
    <Link
      to="/"
      className="pl-.5x mt-1x"
      activeClassName="font-bold text-primary"
    >
      About
    </Link>
    <Link
      to="/blog/"
      className="pl-.5x mt-1x"
      activeClassName="font-bold text-primary"
    >
      Blog
    </Link>
    <div className="flex pl-.5x mb-1x mt-1x pt-1x border-t">
      <ExternalLink href={links.linkedin} className="mr-1x">
        <Linkedin />
      </ExternalLink>
      <ExternalLink href={links.links}>
        <GitHub />
      </ExternalLink>
    </div>
  </nav>
);

MobileNav.propTypes = {
  links: Links.isRequired,
};

export default MobileNav;
