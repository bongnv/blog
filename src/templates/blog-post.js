import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "@/components/layout";
import { Metadata } from "@/types/site-metadata";
import PostMeta from "@/components/post-meta";
import SideBar from "@/components/sidebar";

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;
  const headings = data.markdownRemark.headings;
  const showSidebar = headings && headings.length > 0;
  return (
    <Layout siteMetadata={data.site.siteMetadata}>
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
        <div className="hidden xl:block w-64">
          <SideBar headings={headings} />
        </div>
      )}
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: Metadata.isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          depth: PropTypes.number.isRequired,
        }),
      ),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
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
        date(formatString: "MMMM DD, YYYY")
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
