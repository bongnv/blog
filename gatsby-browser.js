/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import PropTypes from "prop-types";

import "./src/styles/index.css";
import Layout from "./src/components/layout";

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};

wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired,
};
