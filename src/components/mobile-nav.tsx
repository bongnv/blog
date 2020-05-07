import React, { FC } from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub } from "react-feather";

import { Links } from "@/types";
import XLink from "./external-link";

interface MobileNavProps {
  links: Links;
}

const MobileNav: FC<MobileNavProps> = ({ links }: MobileNavProps) => (
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
      <XLink to={links.linkedin} className="mr-1x">
        <Linkedin />
      </XLink>
      <XLink to={links.github}>
        <GitHub />
      </XLink>
    </div>
  </nav>
);

export default MobileNav;
