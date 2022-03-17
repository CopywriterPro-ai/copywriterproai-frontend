import React from "react";
import styled from "styled-components";
import Link from "next/link";

import externalLink from "@/data/externallink.json";
import FBIcon from "@/assets/images/contact/Facebook.png";
import DCIcon from "@/assets/images/contact/Discord.png";
import TWIcon from "@/assets/images/contact/Twitter.png";

const year = new Date().getFullYear();

const ListItem = ({ to = "/", title }) => {
  return (
    <List>
      <Link href={to}>{title}</Link>
    </List>
  );
};

const ListItemAnchor = ({ to = "/", title, imgSrc = null }) => {
  return (
    <List>
      {imgSrc && <ImgIcon src={imgSrc} alt={title} />}
      <a href={to} target="__blank">
        {title}
      </a>
    </List>
  );
};

const ListItemChat = ({ title }) => {
  return (
    <List>
      <a href={null} onClick={() => Tawk_API.toggle()}>
        {title}
      </a>
      <span>&#9679;</span>
    </List>
  );
};

const List = styled.li`
  margin: 0.6rem 0;

  a {
    color: #000000;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  span {
    color: #50cb50;
    font-size: 20px;
    margin-left: 5px;
  }
`;

const ImgIcon = styled.img`
  height: 18px;
  margin-right: 5px;
`;

const UserFooter = () => {
  return (
    <Footer>
      <hr></hr>
      <FooterContainer className="container">
        <div className="row">
          <Section className="col-6 col-md-3">
            <SectionWrap>
              <h4>Community</h4>
              <UnorderList>
                <ListItemAnchor
                  imgSrc={FBIcon.src}
                  to={externalLink.facebookGroup}
                  title="Facebook Group"
                />
                <ListItemAnchor
                  imgSrc={DCIcon.src}
                  to={externalLink.discord}
                  title="Discord Server"
                />
                <ListItemAnchor
                  imgSrc={TWIcon.src}
                  to={externalLink.twitter}
                  title="Twitter Account"
                />
              </UnorderList>
            </SectionWrap>
          </Section>
          <Section className="col-6 col-md-3">
            <SectionWrap>
              <h4>CopywriterPro</h4>
              <UnorderList>
                {/* <ListItem to="/tutorials" title="Tutorials" /> */}
                <ListItem to="/pricing" title="Pricing" />
                {/* <ListItem to="/free-credits" title="Free Credits" /> */}
              </UnorderList>
            </SectionWrap>
          </Section>
          <Section className="col-6 col-md-3">
            <SectionWrap>
              <h4>Support</h4>
              <UnorderList>
                <ListItem to="/feature-request" title="Request a Feature" />
                <ListItem to="/bug-report" title="Report a bug" />
                <ListItem to="/contact-us" title="Contact Us" />
                <ListItemChat title="Chat with Us" />
              </UnorderList>
            </SectionWrap>
          </Section>
          <Section className="col-6 col-md-3">
            <SectionWrap style={{ border: 0 }}>
              <h4>Company</h4>
              <UnorderList>
                {/* <ListItem to="/" title="Careers" /> */}
                <ListItem to="/privacy" title="Privacy Policy" />
                <ListItem to="/terms" title="Terms & Conditions" />
              </UnorderList>
            </SectionWrap>
          </Section>
        </div>
      </FooterContainer>
      <FooterCredit>
        <p>© {year} CopywriterPro. All rights reserved.</p>
      </FooterCredit>
    </Footer>
  );
};

const Footer = styled.footer`
  hr {
    margin: 0;
    padding: 0;
  }
`;

const FooterContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  h4 {
    font-size: 18px;
    line-height: 30px;
  }
`;

const SectionWrap = styled.div`
  border-right: 1px solid #d5d5d5;
  height: 100%;

  @media (max-width: 768px) {
    border-right: 0;
  }
`;

const UnorderList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1.2rem;
`;

const FooterCredit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3a4841;
  height: 2.8rem;

  p {
    margin: 0;
    color: #ffffff;
  }
`;

export default UserFooter;
