import React from "react";
import PropTypes from "prop-types";

const PostMeta = ({ post }) => (
  <p className="text-sm">
    <span>Posted on {post.frontmatter.date}</span>
    {" - "}
    <strong>{Math.ceil(post.fields.readingTime.minutes)} min read</strong>
  </p>
);

PostMeta.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
    }),
    fields: PropTypes.shape({
      readingTime: PropTypes.shape({
        minutes: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default PostMeta;
