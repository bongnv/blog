import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import PostMeta from "./post-meta";

const PostCard = ({ post }) => (
  <Link to={post.fields.slug}>
    <div className="border p-1x sm:p-2x card-transition-effect text-foreground my-2x">
      <h2 className="font-display font-semibold text-lg mb-.5x">
        {post.frontmatter.title}
      </h2>
      <p className="leading-snug font-body mb-1x">
        {post.frontmatter.description || post.excerpt}
      </p>
      <PostMeta post={post} />
    </div>
  </Link>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    excerpt: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PostCard;
