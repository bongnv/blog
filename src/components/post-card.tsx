import React, { FC } from "react";
import { Link } from "gatsby";

import PostMeta from "./post-meta";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }: PostCardProps) => (
  <Link to={post.fields.slug}>
    <div className="border border-divider p-1x sm:p-2x card-transition-effect my-2x">
      <h2 className="font-display font-bold text-lg mb-.5x">
        {post.frontmatter.title}
      </h2>
      <p className="leading-snug font-body mb-1x">
        {post.frontmatter.description || post.excerpt}
      </p>
      <PostMeta post={post} />
    </div>
  </Link>
);

export default PostCard;
