import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import SEO from "@/components/seo";
import { Post } from "@/types";

interface IndexPageProps {
  data: {
    markdownRemark: Post;
  };
}

const IndexPage: FC<IndexPageProps> = ({ data }: IndexPageProps) => {
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

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
    }
  }
`;
