import React from "react";
import styled from "styled-components";

import { CondLayout as Layout } from "@/layout";
import externalLink from "@/data/externallink.json";
import ContactBgImg from "@/assets/images/contact-bg.png";
import FacebookIcon from "@/assets/images/contact/Facebook.png";
import DiscordIcon from "@/assets/images/contact/Discord.png";
import TwitterIcon from "@/assets/images/contact/Twitter.png";
import { useUser } from "@/hooks";

const contactlinks = [
  {
    name: "Facebook",
    link: externalLink.facebookGroup,
    icon: FacebookIcon,
  },
  { name: "Discord", link: externalLink.discord, icon: DiscordIcon },
  { name: "Twitter", link: externalLink.twitter, icon: TwitterIcon },
];

const ContactIcon = () => {
  return (
    <div className="col-md-5">
      <ContactBox>
        <h3>Join us on</h3>
        <Flex>
          {contactlinks.map((contact) => (
            <ContactBoxItem key={contact.name}>
              <a href={contact.link} target="__blank">
                <ContactIconImg src={contact.icon.src} alt={contact.name} />
              </a>
            </ContactBoxItem>
          ))}
        </Flex>
      </ContactBox>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
`;

const ContactBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  h3 {
    font-size: 32px;
    line-height: 45px;
    font-weight: 400;
    margin-bottom: 35px;
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;

    h3 {
      margin-bottom: 10px;
    }
  }
`;

const ContactBoxItem = styled.div`
  margin: 0 15px;
`;

const ContactIconImg = styled.img``;

const ConatactTemplate = ({ children, title }) => {
  return (
    <Layout>
      <div className="container">
        <Section>
          <ContactContainer className="row">
            <ContactIcon />
            <div className="col-md-7">
              <div>
                <FormTitle>{title}</FormTitle>
                {children}
              </div>
            </div>
          </ContactContainer>
        </Section>
      </div>
    </Layout>
  );
};

const Section = styled.div`
  margin: 80px 0;
`;

const ContactContainer = styled.div`
  background-image: url(${ContactBgImg.src});
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: -100px;

  @media (max-width: 768px) {
    background-image: none;
    margin-left: -15px;
  }
`;

const FormTitle = styled.h3`
  font-size: 28px;
  font-weight: 400;
  margin-left: 2rem;
  margin-bottom: 1.6rem;

  @media (max-width: 768px) {
    margin-left: 0rem;
    text-align: center;
  }
`;

export default ConatactTemplate;
