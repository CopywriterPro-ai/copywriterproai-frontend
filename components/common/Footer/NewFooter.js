/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Logo from "@/assets/images/logo2.png";

const Explores = [
  {
    name: "Features",
    link: "/#features",
    external: false,
  },
  {
    name: "Pricing",
    link: "/pricing",
    external: false,
  },
  {
    name: "Resources",
    link: "/#",
    external: false,
  },
  {
    name: "AI Blog Writing",
    link: "/app",
    external: false,
  },
];

const Supports = [
  {
    name: "Facebook Group",
    link: "https://facebook.com/groups/copywriterproai",
    external: true,
  },
  {
    name: "Request a Feature",
    link: "/feature-request",
    external: false,
  },
  {
    name: "Report a bug",
    link: "/bug-report",
    external: false,
  },
  {
    name: "Contact Us",
    link: "/contact-us",
    external: false,
  },
];

const Companies = [
  {
    name: "Privacy Policy",
    link: "/privacy",
    external: false,
  },
  {
    name: "Terms & Conditions",
    link: "/terms",
    external: false,
  },
];

const Socials = [
  {
    name: "Twitter",
    link: "https://twitter.com/CopywriterProAI",
    icon: "fab fa-twitter",
    color: "#00ACEE",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/CopywriterProAI",
    icon: "fab fa-facebook-square",
    color: "#3B5998",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UCbyvGTnxFPeEuHzNUKJ5LNg",
    icon: "fab fa-youtube",
    color: "#FF0000",
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/company/copywriterproai/",
    icon: "fab fa-linkedin",
    color: "#0E76A8",
  },
];

const FooterLinks = [
  {
    name: "Explore",
    links: Explores,
  },
  {
    name: "Support",
    links: Supports,
  },
  {
    name: "Company",
    links: Companies,
  },
];

const LinkList = ({ links = [] }) => {
  return (
    <StyledLinkListUL>
      {links.map((item) => (
        <li key={item.link}>
          {item.external ? (
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.name}
            </a>
          ) : (
            <Link href={item.link}>{item.name}</Link>
          )}
        </li>
      ))}
    </StyledLinkListUL>
  );
};

const NewFooter = () => {
  return (
    <Container>
      <div className="container">
        <StyledFooterContent>
          <div style={{ flex: 4 }}>
            <StyledFooterBrandIcon>
              <img src={Logo.src} height="45" alt="copywriterpro logo" />
              <div>
                Have questions?
                <br />
                Reach out to us at{" "}
                <a href="mailto:support@copywriterpro.ai">
                  support@copywriterpro.ai
                </a>
              </div>
            </StyledFooterBrandIcon>
          </div>
          {FooterLinks.map((item) => (
            <StyledFooterContentItem key={item.name}>
              <strong>{item.name}</strong>
              <LinkList links={item.links} />
            </StyledFooterContentItem>
          ))}
        </StyledFooterContent>
        <StyledFooterHR />
        <StyledFooterBrand>
          © 2022 CopywriterPro. All Rights Reserved.
          <StyledFooterSocialLink>
            {Socials.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <StyledFooterSocialLinkIcon
                  Color={item.color}
                  className={item.icon}
                />
              </a>
            ))}
          </StyledFooterSocialLink>
        </StyledFooterBrand>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  background-color: #f3f6f9;
`;

const StyledFooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 3rem;
  padding-bottom: 2.5rem;
  gap: 5rem;
`;

const StyledFooterBrand = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const StyledFooterHR = styled.hr`
  color: #d4d4d4;
  margin: 0;
`;

const StyledFooterContentItem = styled.div``;

const StyledFooterSocialLink = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;

  a {
    color: black;
  }
`;

const StyledFooterSocialLinkIcon = styled.i`
  font-size: 18px;

  &:hover {
    color: ${({ Color }) => Color};
  }
`;

const StyledLinkListUL = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 0.8rem 0;
    font-size: 15px;

    a {
      color: black;
      text-decoration: none;
    }
  }
`;

const StyledFooterBrandIcon = styled.div`
  font-weight: 500;
  font-size: 15px;

  img {
    margin-bottom: 2rem;
  }
  a {
    color: #007fff;
    text-decoration: none;
  }
`;

export default NewFooter;
