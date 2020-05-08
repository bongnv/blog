import React from "react";
import { Link } from "gatsby";

interface TagsFooterProps {
  tags: Array<string>;
}

const TagsFooter: React.FC<TagsFooterProps> = ({
  tags = [],
}: TagsFooterProps) => {
  return (
    <ul className="mb-1x">
      {tags.map((tag) => (
        <li key={tag} className="inline-block mr-.5x my-.5x">
          <Link to={`/tags/${tag}/`} className="rounded p-.5x bg-surface">
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsFooter;
