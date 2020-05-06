import PropTypes from "prop-types";

export const Links = PropTypes.shape({
  linkedin: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
});

export const Metadata = PropTypes.shape({
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  links: Links.isRequired,
});
