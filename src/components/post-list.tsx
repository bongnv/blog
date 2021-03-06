import React from "react";

import { Post } from "@/types";
import PostCard from "@/components/post-card";
import SEO from "@/components/seo";
import TagsSideBar from "@/components/tags-sidebar";

interface PostListProps {
  title: string;
  tag?: string;
  description?: string;
  edges: Array<{
    node: Post;
  }>;
}

const PostList: React.FC<PostListProps> = ({
  title,
  tag = "",
  description,
  edges,
}: PostListProps) => {
  return (
    <>
      <SEO title={title} description={description} />
      <div className="hidden xl:block w-64 flex-grow">
        <TagsSideBar currentTag={tag} />
      </div>
      <main className="w-full max-w-2xl">
        <div className="text-center my-2x">
          <h1 className="text-4xl mb-1x font-bold font-display">{title}</h1>
          {description && <p className="font-body">{description}</p>}
        </div>
        {edges.map(({ node }) => (
          <PostCard key={node.id} post={node} />
        ))}
      </main>
      <div className="hidden xl:block w-64 flex-grow" />
    </>
  );
};

export default PostList;
