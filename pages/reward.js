import React from "react";
import styled from "styled-components";

import { UserLayout as Layout } from "@/layout";

const rewards = [
  {
    title: "Review on G2 Crowd",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, aliquam tempore? Fugit voluptas, soluta perferendis necessitatibus dolores exercitationem natus tempore.</p>",
    link: "https://example.com",
  },
  {
    title: "Review on G2 Crowd",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, aliquam tempore? Fugit voluptas, soluta perferendis necessitatibus dolores exercitationem natus tempore.</p>",
    link: "https://example.com",
  },
  {
    title: "Review on G2 Crowd",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, aliquam tempore? Fugit voluptas, soluta perferendis necessitatibus dolores exercitationem natus tempore.</p>",
    link: "https://example.com",
  },
  {
    title: "Review on G2 Crowd",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, aliquam tempore? Fugit voluptas, soluta perferendis necessitatibus dolores exercitationem natus tempore.</p>",
    link: "https://example.com",
  },
];

const Reward = () => {
  return (
    <Layout>
      <Container>
        <RewardBox>
          <RewardHeader>
            <h2>Review Us &#38; Get Rewarded!</h2>
            <p>
              For every review you write for us, we&#39;ll give you some free
              credits once your review is published.
            </p>
          </RewardHeader>

          {rewards.map((reward, index) => (
            <RewardItem key={index}>
              <h2>{reward.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: reward.content }} />
              <a href={reward.link} target="_blank" rel="noreferrer">
                <button>Write A Review</button>
              </a>
            </RewardItem>
          ))}
        </RewardBox>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  max-width: 950px;
  margin: 200px auto;
  padding: 5px;
`;

const RewardBox = styled.div`
  min-height: 500px;
  width: 100%;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 18px;
`;

const RewardHeader = styled.div`
  text-align: center;
  min-height: 250px;
  p {
    font-weight: 300;
    font-size: 17px;
    padding: 13px 0;
  }
`;

const RewardItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 10px 0;
  border-radius: 2px;
  padding: 15px;

  h2 {
    font-size: 26px;
    font-weight: 400;
  }
  p {
    color: #585858;
    font-size: 17px;
    line-height: 26px;
  }
  button {
    text-transform: uppercase;
    border: 0;
    outline: 0;
    padding: 10px 24px;
    background: #4cba97;
    color: white;
    border-radius: 3px;
}
  }
`;

export default Reward;
