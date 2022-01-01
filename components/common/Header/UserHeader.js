import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styled from "styled-components";

import externalLink from "@/data/externallink.json";
import { postUserLogout } from "@/redux/slices/auth";
import {
  toggleBookmarkSidebar,
  falseBookmarkSidebar,
  setNavBarHeigth,
  setTopBarHeigth,
  setTopBarStatus,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import { useResponsive } from "@/hooks";
import LogoImg from "@/assets/images/logo-white.png";
import { useElementSize, useUser } from "@/hooks";

const NavItem = ({ link, title }) => {
  return (
    <li>
      <Link href={link} passHref>
        <NavItemLink>{title}</NavItemLink>
      </Link>
    </li>
  );
};

const NavComDropdownMenuItem = ({ isOpen, toggle, MenuName }) => {
  return (
    <li style={{ alignSelf: "center" }}>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle
          style={{ color: "white", cursor: "pointer" }}
          tag="span"
          data-toggle="dropdown"
          aria-expanded={isOpen}
        >
          {MenuName} <span className="fas fa-angle-down"></span>
        </DropdownToggle>
        <NavDropdownMenus>
          <a href={externalLink.facebookGroup} target="__blank">
            <NavDropdownItem tag="div">Facebook Group</NavDropdownItem>
          </a>
          <a href={externalLink.discord} target="__blank">
            <NavDropdownItem tag="div">Discord Server</NavDropdownItem>
          </a>
          <a href={externalLink.twitter} target="__blank">
            <NavDropdownItem tag="div">Twitter Account</NavDropdownItem>
          </a>
        </NavDropdownMenus>
      </Dropdown>
    </li>
  );
};

const NavBlogDropdownMenuItem = ({ isOpen, toggle, MenuName }) => {
  return (
    <li style={{ alignSelf: "center" }}>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle
          style={{ color: "white", cursor: "pointer" }}
          tag="span"
          data-toggle="dropdown"
          aria-expanded={isOpen}
        >
          {MenuName} <span className="fas fa-angle-down"></span>
        </DropdownToggle>
        <NavDropdownMenus>
          <Link href="/ai-blog-generator">
            <a>
              <NavDropdownItem tag="div">Generate</NavDropdownItem>
            </a>
          </Link>
          <Link href="/draft">
            <a>
              <NavDropdownItem tag="div">Drafts</NavDropdownItem>
            </a>
          </Link>
        </NavDropdownMenus>
      </Dropdown>
    </li>
  );
};

const AppHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();

  const {
    isAuth,
    userInfo: { firstName, lastName, profileAvatar },
    authToken: {
      refreshToken: { token },
    },
  } = useUser();

  const fullName = `${firstName} ${lastName}`;

  const noticeTopRef = useRef();
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [comIsOpen, setComIsOpen] = useState(false);
  const [blogIsOpen, setBlogIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const comToggle = () => setComIsOpen(!comIsOpen);
  const blogToggle = () => setBlogIsOpen(!blogIsOpen);

  const { height: topNoticeHeight } = useElementSize(noticeTopRef);
  const { height: navHeight } = useElementSize(navRef);

  const { showTopBar } = useSelector(uiSelector.getHeaderSize);

  const handleSignout = () => {
    dispatch(postUserLogout({ data: { refreshToken: token } })).then(
      ({ payload }) => {
        if (payload.status === 204) {
          router.push("/");
        }
      }
    );
  };

  useEffect(() => {
    dispatch(setTopBarHeigth(topNoticeHeight));
  }, [dispatch, topNoticeHeight]);

  useEffect(() => {
    dispatch(setNavBarHeigth(navHeight));
  }, [dispatch, navHeight]);

  useEffect(() => {
    isMobile && dispatch(falseBookmarkSidebar());
  }, [dispatch, isMobile, router.pathname]);

  const toggleSidebar = () => {
    isMobile && dispatch(toggleBookmarkSidebar());
  };

  useEffect(() => {
    if (!isMobile) {
      dispatch(falseBookmarkSidebar());
    }
  }, [dispatch, isMobile]);

  const handleTopBar = (val) => {
    dispatch(setTopBarStatus(val));
  };

  return (
    <div>
      {showTopBar && (
        <TopNotice ref={noticeTopRef}>
          <div style={{ maxWidth: "80%" }}>
            New Year’s Sale! Apply <u>MYSTERYDEAL</u> and Get a Flat 60% OFF!
            Ends January 10.
            {/* <a href={externalLink.facebookGroup} target="__blank">
              <JoinButton>Join</JoinButton>
            </a> */}
          </div>
          <div style={{ position: "absolute", right: "10px" }}>
            <i
              onClick={() => handleTopBar(false)}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </div>
        </TopNotice>
      )}
      <MyNavbar
        ref={navRef}
        shownotice={showTopBar.toString()}
        noticeheight={topNoticeHeight}
      >
        <div className="container-fluid">
          <NavbarContainer>
            <Logo>
              <Link href={isAuth ? "/app" : "/"}>
                <a>
                  <LogoIcon src={LogoImg.src} alt="copywriterpro" />
                </a>
              </Link>
            </Logo>
            <NavList>
              <ul>
                {isAuth && (
                  <>
                    <NavBlogDropdownMenuItem
                      isOpen={blogIsOpen}
                      toggle={blogToggle}
                      MenuName="Blog"
                    />
                    <NavItem link="/bookmarks" title="Bookmarks" />
                  </>
                )}
                {!isAuth && <NavItem link="/ai-blog-generator" title="Blog" />}
                <NavItem link="/pricing" title="Pricing" />
                <NavComDropdownMenuItem
                  isOpen={comIsOpen}
                  toggle={comToggle}
                  MenuName="Comminuty"
                />
              </ul>
            </NavList>

            <MobileToogle
              onClick={toggleSidebar}
              className="fas fa-bars"
            ></MobileToogle>

            {!isAuth && (
              <NavbarMenu>
                <NavList>
                  <NavItem link="/signin" title="Signin" />
                  <NavItem link="/signup" title="Signup" />
                </NavList>
              </NavbarMenu>
            )}

            {isAuth && (
              <NavbarMenu>
                <Dropdown isOpen={isOpen} toggle={toggle}>
                  <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={isOpen}
                  >
                    <DropdownAvatar>
                      {profileAvatar ? (
                        <AvatarImg src={profileAvatar} alt={fullName} />
                      ) : (
                        <FirstCharAvatar>{firstName.charAt(0)}</FirstCharAvatar>
                      )}
                      <span>{fullName}</span>
                      <span
                        style={{ paddingLeft: "5px" }}
                        className="fas fa-angle-down"
                      ></span>
                    </DropdownAvatar>
                  </DropdownToggle>
                  <NavDropdownMenu>
                    <NavDropdownItem tag="div">
                      <Link href="/bookmarks">
                        <a>
                          <span className="far fa-user"></span> My account
                        </a>
                      </Link>
                    </NavDropdownItem>
                    <NavDropdownItem tag="div" onClick={handleSignout}>
                      <span className="fas fa-sign-out-alt"></span> Log out
                    </NavDropdownItem>
                  </NavDropdownMenu>
                </Dropdown>
              </NavbarMenu>
            )}
          </NavbarContainer>
        </div>
      </MyNavbar>
    </div>
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

const NavDropdownMenu = styled(DropdownMenu)`
  background: #3a4841;

  a {
    color: white;
    &:hover {
      color: black;
      text-decoration: none;
    }
  }
`;

const NavDropdownMenus = styled(DropdownMenu)`
  background: #3a4841;
  top: 25px !important;

  a {
    color: white;
    &:hover {
      color: black;
      text-decoration: none;
    }
  }
`;

const NavDropdownItem = styled(DropdownItem)`
  color: #fff;
  cursor: pointer;

  &:active {
    background-color: white;
  }
`;

const MyNavbar = styled.nav`
  background-color: #3a4841;
  display: flex;
  flex-direction: row;
  height: 55px;
  align-items: center;
  margin-top: ${({ shownotice, noticeheight }) =>
    shownotice === "true" ? `${noticeheight}px` : `${0}px`};

  @media (min-width: 768px) {
    padding: 35px 0px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }
`;

const NavbarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;

  /* @media (max-width: 768px) {
    justify-content: space-between;
  } */
`;

const Logo = styled.div`
  position: absolute;
  left: 0;
  align-self: center;
  margin-bottom: 5px;
`;

const LogoIcon = styled.img`
  height: 38px;
`;

const NavList = styled.div`
  align-self: center;

  li {
    float: left;
    list-style-type: none;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItemLink = styled.a`
  display: block;
  color: white;
  text-align: center;

  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const MobileToogle = styled.span`
  align-self: center;
  color: #ffffff;
  cursor: pointer;
  font-size: 25px;
  position: absolute;
  right: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const FirstCharAvatar = styled.span`
  align-items: center;
  // background-color: #e69500;
  background-color: rgba(15, 160, 152, 1);
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 22px;
  justify-content: center;
  text-transform: uppercase;
  width: 22px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
`;

const NavbarMenu = styled.div`
  align-self: center;
  position: absolute;
  right: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownAvatar = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;

  span {
    margin-left: 5px;
    color: #fff;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  height: 20px;
  object-fit: contain;
  width: 20px;
`;

export default AppHeader;
