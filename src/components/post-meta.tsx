import React, { FC } from "react";

import { Post } from "@/types";

interface PostMetaProps {
  post: Post;
}

const PostMeta: FC<PostMetaProps> = ({ post }: PostMetaProps) => (
  <p className="text-sm">
    <span>Posted on {post.frontmatter.date}</span>
    {" - "}
    <strong>{Math.ceil(post.fields.readingTime.minutes)} min read</strong>
  </p>
);

export default PostMeta;
