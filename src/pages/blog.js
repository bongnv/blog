import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import PostCard from "@/components/post-card";
import SEO from "@/components/seo";

const BlogIndexPage = ({ data }) => {
  const title = "The blog of Bong";
  const description =
    "Hey! I write about my personal experiences and challenges here.";
  const edges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title={title} description={description} />
      <article className="w-full max-w-2xl">
        <div className="text-center my-2x">
          <h1 className="text-4xl text-foreground mb-1x font-extrabold font-display">
            {title}
          </h1>
          <p className="text-gray-800">{description}</p>
        </div>
        {edges.map(({ node }) => (
          <PostCard key={node.id} post={node} />
        ))}
      </article>
    </Layout>
  );
};

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
          }),
        }),
      ),
    }).isRequired,
  }).isRequired,
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { isBlog: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
