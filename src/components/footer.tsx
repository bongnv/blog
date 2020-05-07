import React, { FC } from "react";

import XLink from "./external-link";

interface FooterProps {
  author: string;
  source: string;
}

const Footer: FC<FooterProps> = ({ author, source }: FooterProps) => (
  <footer className="py-1x border-t">
    <p className="font-display text-sm text-center">
      {author} © 2016 - Present | <XLink to={source}>Source</XLink>
    </p>
  </footer>
);

export default Footer;
