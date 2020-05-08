import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import classNames from "@/utils/class-names";

interface TagsSideBar {
  currentTag?: string;
}

const TagsSideBar: React.FC<TagsSideBar> = ({
  currentTag = "",
}: TagsSideBar) => {
  const result = useStaticQuery(graphql`
    query {
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const tags = result.tagsGroup.group as Array<{
    fieldValue: string;
    totalCount: number;
  }>;
  return (
    <div className="top-4x sticky font-display border-r pr-1x mt-4x mr-1x">
      <h3 className="font-bold tracking-wide uppercase mb-.5x pb-.5x border-b">
        Tags
      </h3>
      <ul className="">
        {tags.map((tag) => (
          <li key={tag.fieldValue} className="inline-block mr-.5x my-.5x">
            <Link
              to={`/tags/${tag.fieldValue}/`}
              className={classNames({
                "rounded p-.5x bg-surface": true,
                "font-bold text-primary": tag.fieldValue === currentTag,
              })}
            >
              {`${tag.fieldValue} (${tag.totalCount})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsSideBar;
