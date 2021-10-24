import React from "react";
import styled from "styled-components";

import { CondLayout as Layout } from "@/layout";
import PricingCard from "@/components/PricingCard";
import Faq from "@/components/Faq";

const Pricing = () => {
  return (
    <Layout>
      <div className="container">
        <Section>
          <PricingCard />
        </Section>
        <Section>
          <Faq />
        </Section>
      </div>
    </Layout>
  );
};

const Section = styled.div`
  margin: 85px 0;
`;

export default Pricing;
