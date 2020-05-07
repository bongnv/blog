/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          author
          title
          links {
            linkedin
            github
            source
          }
        }
      }
    }
  `);
  const siteMetadata = data.site.siteMetadata;

  return (
    <>
      <Header siteMetadata={siteMetadata} />
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
};

export default Layout;
