/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/blog-post.tsx");

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { isBlog: { eq: true } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
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
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const edges = result.data.allMarkdownRemark.edges;
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
