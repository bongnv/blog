module.exports = {
  siteMetadata: {
    title: "@bongnv",
    description:
      "Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",
    author: "Bong Nguyen",
    links: {
      linkedin: "https://linkedin.com/in/bongnv",
      github: "https://github.com/bongnv",
      source: "https://github.com/bongnv/blog",
      email: "mailto:vanbong@gmail.com",
    },
    siteUrl: "https://bongnv.com",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 70,
              className: "heading-anchor",
              elements: [`h2`, `h3`],
              isIconAfterHeader: true,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-reading-time",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-11696168-2",
      },
    },
    "gatsby-plugin-sitemap",
  ],
};
