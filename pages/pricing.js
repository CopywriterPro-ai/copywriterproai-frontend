import React from 'react';

import Layout from '@/layout/Layout';
import Footer from '@/layout/Footer/Footer';
import Navbar from '@/layout/Header/Navbar';
import Faq from '@/components/faq/FaqThree';
import Packages from '@/components/pricing/Packages';
import PageHeader from '@/components/common/PageHeader';
import TestimonialOne from '@/components/testimonial/Testimonial';

import { pricing as metaData } from '@/utils/metaData';
import { pricing as pageHeader } from '@/utils/pageHeader';

const Pricing = () => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <Navbar classOption="navbar-light" />
      <PageHeader
        title={pageHeader.title}
        description={pageHeader.description}
      />

      <Packages />
      <Faq />
      <TestimonialOne />
      <Footer />
    </Layout>
  );
};

export default Pricing;
