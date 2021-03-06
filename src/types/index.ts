export interface Post {
  id: string;
  excerpt: string;
  html: string;
  headings: Array<Heading>;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: Array<string>;
  };
  fields: {
    slug: string;
    readingTime: {
      minutes: number;
    };
  };
}

export interface Heading {
  id: string;
  depth: number;
  value: string;
}

export interface Links {
  linkedin: string;
  github: string;
  source: string;
  email: string;
}

export interface Metadata {
  author: string;
  title: string;
  links: Links;
}
