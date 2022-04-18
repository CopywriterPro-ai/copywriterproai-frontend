import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styled from "styled-components";
import dayjs from "dayjs";

import externalLink from "data/externallink.json";
import NavMeunuIcon from "assets/images/navmenu.png";
import Logo from "assets/images/logo-color.png";
import { useResponsive, useElementSize, useNotice } from "hooks";

const AppNavLink = ({ to = "/", title = "Page Title", shapebox = "none" }) => {
  const { isDesktop } = useResponsive();
  const shape = shapebox === "active" ? true : false;
  const isShape = Boolean(shape && isDesktop);

  return (
    <NavItem>
      <Link href={to} passHref>
        <AppNavLinkShape href={to} shapebox={isShape ? "active" : "none"}>
          {title}
        </AppNavLinkShape>
      </Link>
    </NavItem>
  );
};

const AppBrandLogo = forwardRef(({ onClick, href }, ref) => {
  AppBrandLogo.displayName = "AppBrandLogo";
  return (
    <NavbarBrand href={href} onClick={onClick}>
      <AppLogo src={Logo.src} alt="copywriterpro.ai"></AppLogo>
    </NavbarBrand>
  );
});

const AppHeader = () => {
  const noticeTopRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const { height: topNoticeHeight } = useElementSize(noticeTopRef);
  const { data: noticeData } = useNotice();

  const { active, title, description, expiryTime } = noticeData;

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setShowNotice(active);
  }, [active]);

  return (
    <header>
      {showNotice && (
        <TopNotice ref={noticeTopRef}>
          <div style={{ maxWidth: "80%" }}>
            {active && (
              <>
                {title}{" "}
                <span dangerouslySetInnerHTML={{ __html: description }}></span>{" "}
                Ends
                {expiryTime && dayjs(expiryTime).format("MMMM D")}.
              </>
            )}
          </div>
          <div style={{ position: "absolute", right: "10px" }}>
            <i
              onClick={() => setShowNotice(false)}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </div>
        </TopNotice>
      )}
      <NavBar
        shownotice={showNotice.toString()}
        noticeheight={`${topNoticeHeight}px`}
        light
        expand="md"
      >
        <div className="container">
          <Link href="/" passHref>
            <AppBrandLogo />
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <AppNavLink to="/#features" title="Features" />
              <AppNavLink to="/pricing" title="Pricing" />
              <AppNavLink to="/affiliates" title="Affiliates" />
              <UncontrolledDropdown nav inNavbar>
                <StyledDropdownToggle nav caret>
                  Community
                </StyledDropdownToggle>
                <StyledDropdownMenu left="true">
                  <DropdownItem
                    href={externalLink.facebookGroup}
                    target="__blank"
                  >
                    Facebook Group
                  </DropdownItem>
                  <DropdownItem href={externalLink.discord} target="__blank">
                    Discord Server
                  </DropdownItem>
                </StyledDropdownMenu>
              </UncontrolledDropdown>
            </Nav>

            <Nav className="ml-auto" navbar>
              <AppNavLink to="/signin" title="Sign in" />
              <AppNavLink to="/signup" title="Sign up" shapebox="active" />
            </Nav>
          </Collapse>
        </div>
      </NavBar>
    </header>
  );
};

const TopNotice = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  position: fixed;
  background: #2cae97;
  color: white;
  margin: 0px;
  top: 0px;
  z-index: 1031;
  color: white;
  font-size: 17px;
  text-align: center;
  font-weight: 500;
`;

const JoinButton = styled.button`
  background: #ffffff00;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  padding: 0 5px;
`;

const AppLogo = styled.img`
  height: 45px;

  @media (max-width: 992px) {
    height: 40px;
  }

  @media (max-width: 768px) {
    height: 55px;
    padding-left: 11px;
  }

  @media only screen and (max-width: 768px) and (min-width: 768px) {
    height: 45px;
    padding-left: 0px;
  }

  @media (max-width: 576px) {
    height: 50px;
    padding-left: 0px;
  }

  @media (max-width: 425px) {
    height: 45px;
  }

  @media (max-width: 375px) {
    height: 37px;
  }

  @media (max-width: 319px) {
    height: 31px;
  }

  @media (max-width: 270px) {
    height: 29px;
  }
`;

const NavBar = styled(Navbar)`
  margin-top: ${({ shownotice, noticeheight }) =>
    shownotice === "true" ? noticeheight : null};
  padding-top: 25px;

  @media (max-width: 992px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
    flex-wrap: wrap;

    .ml-auto:nth-of-type(1) {
      padding-top: 50px;
    }

    .ml-auto {
      font-size: 16px;
    }
  }

  @media (max-width: 576px) {
    .ml-auto {
      font-size: 15px;
    }
  }

  @media (max-width: 425px) {
    .ml-auto {
      font-size: 14px;
    }
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  padding: 12px 18px !important;
  color: black !important;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  background-color: transparent;
  border: none;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    font-size: 15px;
  }

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

const AppNavLinkShape = styled(NavLink)`
  background-image: ${({ shapebox }) =>
    shapebox === "active" ? `url(${NavMeunuIcon.src})` : null};
  padding: 12px 26px !important;
  color: ${({ shapebox }) =>
    shapebox === "active" ? "white !important" : "black !important"};
  font-weight: ${({ shapebox }) => (shapebox === "active" ? 500 : null)};
  background-repeat: ${({ shapebox }) =>
    shapebox === "active" ? "no-repeat" : null};
  background-size: ${({ shapebox }) =>
    shapebox === "active" ? "contain" : null};
  background-position-x: ${({ shapebox }) =>
    shapebox === "active" ? "right" : null};

  @media (max-width: 992px) {
    padding: 9px 18px !important;
    margin-top: 2px;
  }
`;

export default AppHeader;
