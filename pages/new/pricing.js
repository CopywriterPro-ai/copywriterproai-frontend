import React from "react";
import styled from "styled-components";

import Layout from "@/layout/NewLayout";
import PricingCard from "@/components/PricingCardNew";
import Faq from "@/components/Faq";

const Pricing = () => {
  return (
    <Layout>
      <Container>
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

const Section = styled.div`
  margin: 85px 0;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1450px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default Pricing;
