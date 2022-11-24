import React from "react";
import styled from "styled-components";

import { CondLayout as Layout } from "@/layout";
// import PricingCard from "@/components/PricingCard";
import Pricing from '@/components/pricing/Packages';
import Faq from "@/components/Faq";

const UserPricing = () => {
  return (
    <Layout>
      <Container className="container">
        <Section>
          <Pricing header={true} paddingTop='pt-40'/>
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

export default UserPricing;
