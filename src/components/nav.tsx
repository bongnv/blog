import React, { FC } from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub, Mail } from "react-feather";

import { Links } from "@/types";
import XLink from "./external-link";
import DarkModeSwitcher from "./dark-mode-switcher";

interface NavProps {
  links: Links;
}

const Nav: FC<NavProps> = ({ links }: NavProps) => (
  <nav className="hidden sm:flex items-center">
    <Link
      to="/"
      className="mr-2x font-medium"
      activeClassName="font-bold text-primary"
    >
      About
    </Link>
    <Link
      to="/blog/"
      className="mr-2x font-medium"
      activeClassName="font-bold text-primary"
    >
      Blog
    </Link>
    <XLink to={links.linkedin} className="mr-1x">
      <Linkedin />
    </XLink>
    <XLink to={links.github} className="mr-1x">
      <GitHub />
    </XLink>
    <XLink to={links.email} className="mr-1x">
      <Mail />
    </XLink>
    <DarkModeSwitcher />
  </nav>
);

export default Nav;
