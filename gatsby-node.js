/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const createBlogTag = (tags, createPage) => {
  const tagTemplate = path.resolve("src/templates/blog-tag.tsx");

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

const createBlogPost = (edges, createPage) => {
  const blogPostTemplate = path.resolve("src/templates/blog-post.tsx");

  edges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: blogPostTemplate,
      context: {
        id: edge.node.id,
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { isBlog: { eq: true } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const edges = result.data.allMarkdownRemark.edges;
  createBlogPost(edges, createPage);

  const tags = result.data.tagsGroup.group;
  createBlogTag(tags, createPage);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const isBlog = slug.startsWith("/blog/");
    const isPublished =
      process.env.NODE_ENV !== "production" || node.frontmatter.published;

    createNodeField({
      name: "slug",
      node,
      value: slug,
    });

    createNodeField({
      name: "isBlog",
      node,
      value: isBlog,
    });

    createNodeField({
      name: "isPublished",
      node,
      value: isPublished,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
