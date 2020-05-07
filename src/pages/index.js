import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import SEO from "@/components/seo";

const IndexPage = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
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
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
    }
  }
`;
