import React, { FC } from "react";

const ExternalLink: FC = (props: any) => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
);

export default ExternalLink;
