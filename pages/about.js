import { GuestLayout as Layout } from "@/layout";
import styled from "styled-components";

const About = () => {
  return (
    <Layout>
      <Container>
        <h1 style={{ marginTop: "50vh" }}>About Page</h1>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  @apply cond;
`;

export default About;
