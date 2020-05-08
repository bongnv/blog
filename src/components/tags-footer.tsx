import React from "react";

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
          <span className="rounded p-.5x bg-surface">{tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default TagsFooter;
