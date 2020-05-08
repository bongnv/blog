import React from "react";

import { Post } from "@/types";
import Layout from "@/components/layout";
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
    <Layout>
      <SEO title={title} description={description} />
      <div className="hidden xl:block w-64">
        <TagsSideBar currentTag={tag} />
      </div>
      <main className="w-full max-w-2xl">
        <div className="text-center my-2x">
          <h1 className="text-4xl text-foreground mb-1x font-extrabold font-display">
            {title}
          </h1>
          {description && (
            <p className="text-gray-800 font-body">{description}</p>
          )}
        </div>
        {edges.map(({ node }) => (
          <PostCard key={node.id} post={node} />
        ))}
      </main>
      <div className="hidden xl:block w-64" />
    </Layout>
  );
};

export default PostList;
