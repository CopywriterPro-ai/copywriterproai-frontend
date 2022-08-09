import React from "react";
import styled from "styled-components";

import { CondLayout as Layout } from "@/layout";
import PricingCard from "@/components/PricingCard";
import Faq from "@/components/Faq";

const Pricing = () => {
  return (
    <Layout>
      <Container className="container">
        <Section>
          <PricingCard />
        </Section>
        <Section>
          <Faq />
        </Section>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
`;

const Section = styled.div`
  margin: 80px 0 55px 0;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export default Pricing;
