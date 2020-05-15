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
  const googleFontsURL =
    "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap";
  const script = `
  const LIGHTS_OUT = "lights-out";
  const darkMode = window.localStorage.getItem(LIGHTS_OUT) === "true";
  document.documentElement.toggleAttribute(LIGHTS_OUT, darkMode);
  `;
  return setHeadComponents([
    <link
      key="preload-google-fonts"
      rel="preload"
      href={googleFontsURL}
      as="style"
    />,
    <link
      key="preconnect-dns-prefetch-google-font"
      href="https://fonts.gstatic.com"
      rel="preconnect dns-prefetch"
    />,
    <link
      key="stylesheet-google-font"
      href={googleFontsURL}
      rel="stylesheet"
    />,
    <script
      key={`script-dark-mode`}
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
