import React from "react";
import PropTypes from "prop-types";

const ExternalLink = ({ children, to }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ExternalLink;
