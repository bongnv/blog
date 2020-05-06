import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import SEO from "@/components/seo";
import { Metadata } from "@/types/site-metadata";

const IndexPage = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout siteMetadata={data.site.siteMetadata}>
      <SEO title="About" />
      <article
        className="w-full max-w-2xl content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: Metadata.isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query {
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
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
    }
  }
`;
