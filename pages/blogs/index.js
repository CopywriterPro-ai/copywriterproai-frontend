import React from 'react';

import Layout from '@/layout/Layout';
import Footer from '@/layout/Footer/Footer';
import Navbar from '@/layout/Header/Navbar';
import BlogFeature from '@/components/blogs/BlogFeature';
import PageHeader from '@/components/common/PageHeader';

import { blogs as metaData } from '@/utils/metaData';
import { blogs as pageHeader } from '@/utils/pageHeader';

const Blogs = () => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <Navbar />
      <PageHeader
        title={pageHeader.title}
        description={pageHeader.description}
        blogtags
      />
      <BlogFeature />
      <Footer />
    </Layout>
  );
};

export default Blogs;
