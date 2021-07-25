import styled from "styled-components";

const Heading = styled.h2`
  background-color: red;
  color: ${({ theme }) => theme.primary};
`;

const Home = () => {
  return (
    <div>
      <Heading>Hello Next js</Heading>
    </div>
  );
};

export default Home;
