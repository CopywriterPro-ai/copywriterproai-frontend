/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Logo from "@/assets/images/logo-color.png";

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
    link: "/app/ai-write-along",
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
    link: "mailto:support@copywriterpro.ai",
    external: true,
  },
  {
    name: "Report a bug",
    link: "mailto:support@copywriterpro.ai",
    external: true,
  },
  {
    name: "Contact Us",
    link: "mailto:support@copywriterpro.ai",
    external: true,
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
        <li key={item.name}>
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
    <StyledFooter>
      <Container>
        <StyledFooterContent>
          <div style={{ flex: 2 }}>
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
          <FooterLinksWrapper>
            {FooterLinks.map((item) => (
              <StyledFooterContentItem key={item.name}>
                <LinkTitle>{item.name}</LinkTitle>
                <LinkList links={item.links} />
              </StyledFooterContentItem>
            ))}
          </FooterLinksWrapper>
        </StyledFooterContent>
        <StyledFooterHR />
        <StyledFooterBrand>
          <FooterCopyright>© 2022 CopywriterPro. All Rights Reserved.</FooterCopyright>
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
      </Container>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: #f3f6f9;
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 1440px) {
    max-width: 1440px;
  }
`;

const StyledFooterContent = styled.div`
  padding: 7.5rem 3.5rem 5rem 3.45rem;
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column;
  }

  @media (max-width: 550px) {
    padding: 4rem 2rem 3rem 2rem;
  }
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10rem;
  margin-left: 2.5rem;

  @media (max-width: 1352px) {
    gap: 9rem;
  }

  @media (max-width: 1255px) {
    gap: 7rem;
  }

  @media (max-width: 1159px) {
    gap: 5rem;
  }

  @media (max-width: 992px) {
    gap: 3rem;
  }

  @media (max-width: 800px) {
    gap: 2.5rem;
  }

  @media (max-width: 767px) {
    margin-left: 0rem;
    margin-top: 4rem;
    justify-content: space-between;
  }
`;

const StyledFooterBrand = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 3rem 2.5rem 3rem;

  @media (max-width: 767px) {
    flex-direction: column;
    font-weight: 500;
    padding: 2rem 2rem 1.5rem 2rem;
  }
`;

const FooterCopyright = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 1352px) {
    font-size: 15px;
  }

  @media (max-width: 1064px) {
    font-size: 13.5px;
    line-height: 20px;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }

  @media (max-width: 340px) {
    font-size: 12px;
  }
`;

const StyledFooterHR = styled.hr`
  color: #d4d4d4;
  margin: 0;
`;

const StyledFooterContentItem = styled.div``;

const LinkTitle = styled.span`
  font-family: 'Verdana';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;

  @media (max-width: 1352px) {
    font-size: 17px;
  }

  @media (max-width: 1064px) {
    font-size: 15px;
    line-height: 35px;
  }

  @media (max-width: 767px) {
    line-height: 25px;
  }
`;

const StyledFooterSocialLink = styled.div`
  display: flex;
  column-gap: 2rem;
  align-items: center;

  a {
    color: black;

    @media (min-width: 1024px) {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 767px) {
    padding-top: 1.5rem;
    column-gap: 2rem;
  }
`;

const StyledFooterSocialLinkIcon = styled.i`
  &:hover {
    color: ${({ Color }) => Color};
  }
`;

const StyledLinkListUL = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;

  li {
    line-height: 40px;

    @media (max-width: 1352px) {
      font-size: 17px;
    }

    @media (max-width: 1064px) {
      font-size: 15px;
      line-height: 35px;
    }

    a {
      font-size: 16px;
      font-weight: 400;
      color: black;
      text-decoration: none;

      @media (max-width: 1352px) {
        font-size: 15px;
      }

      @media (max-width: 1064px) {
        font-size: 13.5px;
        line-height: 20px;
      }
    }
  }
`;

const StyledFooterBrandIcon = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;

  @media (max-width: 1352px) {
    font-size: 15px;
  }

  @media (max-width: 1064px) {
    font-size: 13.5px;
    line-height: 25px;
  }

  img {
    margin-bottom: 2rem;
    @media (max-width: 1024px) {
      height: 2.5rem;
    }
  }
  a {
    font-weight: 500;
    color: #007fff;
    text-decoration: none;
  }
`;

export default NewFooter;
