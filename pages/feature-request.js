import React from 'react';
import Layout from '@/layout/Layout';
import Footer from '@/layout/Footer/Footer';
import Navbar from '@/layout/Header/Navbar';
import PageHeader from '@/components/common/PageHeader';
// import ContactCard from '@components/contact-us/ContactCard';
import ContactForm from '@/components/contact-us/ContactForm';

import { requestFeature as metaData } from '@/utils/metaData';
import { requestFeature as pageHeader } from '@/utils/pageHeader';

const RequestFeature = () => {
  return (
    <Layout title={metaData.title} description={metaData.description}>
      <Navbar classOption="navbar-light" />
      <PageHeader
        title={pageHeader.title}
        description={pageHeader.description}
      />
      {/* <ContactCard /> */}
      {/* <ContactForm headline={"Talk to Our Sales & Marketing Department Team"}/> */}
      <ContactForm headline={""} formType={"requestFeature"}/>
      <Footer />
    </Layout>
  );
};

export default RequestFeature;