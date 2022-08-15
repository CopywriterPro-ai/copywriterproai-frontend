import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { GuestLayout as Layout } from "@/layout";
import Banner from "@/components/pages/landing/Banner";
import Extension from "@/components/pages/landing/Extension";
import GenerateSchedule from "@/components/pages/landing/GenerateSchedule";
import CopywriterOffers from "@/components/pages/landing/CopywriterOffers";
import Resources from "@/components/pages/landing/Resources";
import QuickAuth from "@/components/pages/landing/QuickAuth";
import Faq from "@/components/Faq";

const seo = {
  description:
    "CopywriterPro is the highest quality AI copywriting tool that generates compelling and conversion-ready blog posts, website content, marketing and sales copy with ease.",
};

const additionalMeta = [
  {
    property: "keywords",
    content: "ai content writer, ai copywriting tool, article content creator",
  },
];

const Home = () => {
  return (
    <Layout description={seo.description} additionalMeta={additionalMeta}>
      <PageGlobalStyles />
      <div className="container">
        <Section>
          <Banner />
        </Section>
      </div>
      <Section>
        <Extension />
      </Section>
      <div className="container">
        <Section>
          <GenerateSchedule />
        </Section>
        <Section>
          <CopywriterOffers />
        </Section>
      </div>
      <Section>
        <Resources />
      </Section>
      <Section>
        <Faq />
      </Section>
      <Section>
        <QuickAuth />
      </Section>
    </Layout>
  );
};

const PageGlobalStyles = createGlobalStyle`
  body {
  }
`;

const Section = styled.div``;

export default Home;
