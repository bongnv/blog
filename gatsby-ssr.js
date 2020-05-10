/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import Layout from "./src/components/layout";
import PropTypes from "prop-types";

export const onRenderBody = ({ setHeadComponents }) => {
  const script = `
  const LIGHTS_OUT = "lights-out";
  const darkMode = window.localStorage.getItem(LIGHTS_OUT) === "true";
  document.documentElement.toggleAttribute(LIGHTS_OUT, darkMode);
  `;
  return setHeadComponents([
    <script
      key={`dark-mode-script`}
      dangerouslySetInnerHTML={{ __html: script }}
    />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};

wrapPageElement.propTypes = {
  element: PropTypes.node.isRequired,
};
