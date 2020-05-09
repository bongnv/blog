import React from "react";
import { Link } from "gatsby";

interface TagsFooterProps {
  tags: Array<string>;
}

const TagsFooter: React.FC<TagsFooterProps> = ({
  tags = [],
}: TagsFooterProps) => {
  return (
    <ul className="mb-1x font-display">
      {tags.map((tag) => (
        <li key={tag} className="inline-block m-1">
          <Link
            to={`/tags/${tag}/`}
            className="block rounded p-1 bg-inline-surface"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsFooter;
