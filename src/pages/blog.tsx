import React, { FC } from "react";
import { graphql } from "gatsby";

import { Post } from "@/types";
import PostList from "@/components/post-list";

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
  return <PostList title={title} edges={edges} description={description} />;
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
