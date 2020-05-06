import React from "react";
import PropTypes from "prop-types";

import ExternalLink from "./external-link";

const Footer = ({ author, source }) => (
  <footer className="py-1x border-t">
    <p className="font-display text-sm text-center">
      {author} © 2016 - Present |{" "}
      <ExternalLink href={source}>Source</ExternalLink>
    </p>
  </footer>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

export default Footer;
