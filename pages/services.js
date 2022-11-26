import React from 'react';

import Layout from '@/layout/Layout';
import Footer from '@/layout/Footer/Footer';
import Navbar from '@/layout/Header/Navbar';
import PageHeader from '@/components/common/PageHeader';
import Service from '@/components/features/Feature';
import SupportOne from '@/components/support/SupportOne';
import Testimonial from '@/components/testimonial/Testimonial';

import { services as metaData } from '@/utils/metaData';
import { services as pageHeader } from '@/utils/pageHeader';

const services = () => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <Navbar classOption="navbar-light" />
      <PageHeader
        title={pageHeader.title}
        description={pageHeader.description}
      />

      <Service />
      <Testimonial />
      <SupportOne className="true" />
      <Footer footerLight />
    </Layout>
  );
};

export default services;
