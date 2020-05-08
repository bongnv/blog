import React, { FC } from "react";

import Layout from "@/components/layout";
import SEO from "@/components/seo";

const NotFoundPage: FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <main className="w-full max-w-2xl content">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </main>
  </Layout>
);

export default NotFoundPage;
