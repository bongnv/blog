import React, { FC, ReactNode } from "react";

interface ELinkProps {
  to: string;
  className?: string;
  children: ReactNode;
}

const XLink: FC<ELinkProps> = (props: ELinkProps) => (
  <a
    href={props.to}
    className={props.className}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
);

export default XLink;
