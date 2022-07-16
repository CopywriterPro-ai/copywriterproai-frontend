import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { GuestLayout as Layout } from "@/layout";
import Banner from "@/components/pages/landing/Banner";
import Extension from "@/components/pages/landing/Extension";
import GenerateSchedule from "@/components/pages/landing/GenerateSchedule";
import CopywriterOffers from "@/components/pages/landing/CopywriterOffers";
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
        <Section>
          <Faq />
        </Section>
      </div>
      <Section style={{ margin: "30px 0" }}>
        <QuickAuth />
      </Section>
    </Layout>
  );
};

const PageGlobalStyles = createGlobalStyle`
  body {
    height: 842px;
    width: 100%;
    left: 0px;
    top: 0px;
    background: linear-gradient(180deg, rgba(255, 249, 227, 0.85) 0%, rgba(255, 248, 220, 0) 100%);
    background-repeat: no-repeat;
  }
`;

const Section = styled.div`
  margin: 40px 0;

  @media (max-width: 375px) {
    margin: 15px 0px;
  }
`;

export default Home;
