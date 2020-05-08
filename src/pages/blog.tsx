import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import PostCard from "@/components/post-card";
import SEO from "@/components/seo";
import { Post } from "@/types";

interface BlogIndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Post;
      }>;
    };
  };
}

const BlogIndexPage: FC<BlogIndexPageProps> = ({
  data,
}: BlogIndexPageProps) => {
  const title = "The blog of Bong";
  const description =
    "Hey! I write about my personal experiences and challenges here.";
  const edges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title={title} description={description} />
      <main className="w-full max-w-2xl">
        <div className="text-center my-2x">
          <h1 className="text-4xl text-foreground mb-1x font-extrabold font-display">
            {title}
          </h1>
          <p className="text-gray-800 font-body">{description}</p>
        </div>
        {edges.map(({ node }) => (
          <PostCard key={node.id} post={node} />
        ))}
      </main>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { isBlog: { eq: true }, isPublished: { eq: true } } }
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
