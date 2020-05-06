/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";

import Header from "./header";
import Footer from "./footer";
import { Metadata } from "@/types/site-metadata";

const Layout = ({ children, siteMetadata }) => {
  return (
    <>
      <Header siteTitle={siteMetadata.title} />
      <div className="container w-full max-w-outer min-h-screen pt-16 sm:pt-20 px-1x flex flex-col justify-between">
        <main className="w-full flex justify-center">{children}</main>
        <Footer
          author={siteMetadata.author}
          source={siteMetadata.links.source}
        />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteMetadata: Metadata.isRequired,
};

export default Layout;
