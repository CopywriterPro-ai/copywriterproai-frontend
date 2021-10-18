import styled from "styled-components";

import { GuestLayout as Layout } from "@components/common/Layout";

const Home = () => {
  return (
    <Layout>
      <Container>
        <Heading>Hello Next js</Heading>
        <p>This is server side render app</p>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // Will be passed to the page component as props
  };
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
`;

const Heading = styled.h2`
  /* background-color: red; */
  color: ${({ theme }) => theme.primary};
`;

export default Home;
