import React, { FC } from "react";
import { graphql } from "gatsby";

import { Post } from "@/types";
import PostList from "@/components/post-list";

interface BlogTagProps {
  pageContext: {
    tag: string;
  };
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Post;
      }>;
    };
  };
}

const BlogTagPage: FC<BlogTagProps> = ({ pageContext, data }: BlogTagProps) => {
  const { tag } = pageContext;
  const title = `Tagged in ${tag}`;
  const edges = data.allMarkdownRemark.edges;
  return <PostList title={title} tag={tag} edges={edges} />;
};

export default BlogTagPage;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      filter: {
        fields: { isBlog: { eq: true }, isPublished: { eq: true } }
        frontmatter: { tags: { in: [$tag] } }
      }
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
