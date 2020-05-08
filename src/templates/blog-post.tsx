import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import PostMeta from "@/components/post-meta";
import SideBar from "@/components/sidebar";
import SEO from "@/components/seo";
import { Post } from "@/types";

interface BlogPostProps {
  data: {
    markdownRemark: Post;
  };
}

const BlogPost: FC<BlogPostProps> = ({ data }: BlogPostProps) => {
  const post = data.markdownRemark;
  const headings = data.markdownRemark.headings.filter(
    (heading) => heading.depth > 1 && heading.depth < 4,
  );
  const showSidebar = headings && headings.length > 0;
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      {showSidebar && <div className="hidden xl:block w-64" />}
      <article className="w-full max-w-2xl">
        <h1 className="text-center text-4xl text-foreground font-extrabold font-display mt-2x mb-1x">
          {post.frontmatter.title}
        </h1>
        <div className="text-center mb-2x">
          <PostMeta post={post} />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      {showSidebar && (
        <aside className="hidden xl:block w-64">
          <SideBar headings={headings} />
        </aside>
      )}
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      headings {
        id
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        description
      }
      fields {
        readingTime {
          minutes
        }
      }
    }
  }
`;
