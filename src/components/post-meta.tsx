import React, { FC } from "react";

import { Post } from "@/types";

interface PostMetaProps {
  post: Post;
}

const PostMeta: FC<PostMetaProps> = ({ post }: PostMetaProps) => (
  <p className="text-sm">
    {`Posted on ${post.frontmatter.date} - `}
    <strong>{Math.ceil(post.fields.readingTime.minutes)} min read</strong>
  </p>
);

export default PostMeta;
