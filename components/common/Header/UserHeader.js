import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styled from "styled-components";
import dayjs from "dayjs";

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
import { useElementSize, useUser, useNotice } from "@/hooks";
import { USER_DEFAULT_PATH } from "@/appconstants";

import {FaChevronDown, FaBars, FaSignOutAlt, FaUser} from 'react-icons/fa';

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
        <DropdownToggleOptions
          tag="span"
          data-toggle="dropdown"
          aria-expanded={isOpen}
        >
          {MenuName} <i><FaChevronDown/></i>
        </DropdownToggleOptions>
        <NavDropdownMenu>
          <a href={externalLink.facebookGroup} target="__blank">
            <NavDropdownItem tag="div">Facebook</NavDropdownItem>
          </a>
          <a href={externalLink.twitter} target="__blank">
            <NavDropdownItem tag="div">Twitter</NavDropdownItem>
          </a>
          <a href={externalLink.linkedin} target="__blank">
            <NavDropdownItem tag="div">LinkedIn</NavDropdownItem>
          </a>
        </NavDropdownMenu>
      </Dropdown>
    </li>
  );
};

const NavBlogDropdownMenuItem = ({ isOpen, toggle, MenuName }) => {
  return (
    <li style={{ alignSelf: "center" }}>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggleOptions
          tag="span"
          data-toggle="dropdown"
          aria-expanded={isOpen}
        >
          {MenuName} <i><FaChevronDown/></i>
        </DropdownToggleOptions>
        <NavDropdownMenu>
          <Link href="/app/ai-write-along">
            <a>
              <NavDropdownItem tag="div">
                Write along
              </NavDropdownItem>
            </a>
          </Link>
          <Link href="/app/ai-ghostwriter">
            <a>
              <NavDropdownItem tag="div">
                Ghostwriter <Badge>New</Badge>
              </NavDropdownItem>
            </a>
          </Link>
          <Link href="/draft">
            <a>
              <NavDropdownItem tag="div">Drafts</NavDropdownItem>
            </a>
          </Link>
        </NavDropdownMenu>
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

  const { data: noticeData } = useNotice();

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

  const { active, title, description, expiryTime } = noticeData;

  useEffect(() => {
    dispatch(setTopBarStatus(active));
  }, [active, dispatch]);

  // useEffect(() => {
  //   const onScroll = () => setOffset(window.pageYOffset);
  //   window.removeEventListener('scroll', onScroll);
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, []);

  return (
    <div>
      {/* {showTopBar && (
        <TopNotice ref={noticeTopRef}>
          <div style={{ maxWidth: "80%" }}>
            {active && (
              <>
                {title}{" "}
                <span dangerouslySetInnerHTML={{ __html: description }}></span>{" "}
                Ends {expiryTime && dayjs(expiryTime).format("MMMM D")}.
              </>
            )}
          </div>
          <div style={{ position: "absolute", right: "10px" }}>
            <i
              onClick={() => handleTopBar(false)}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </div>
        </TopNotice>
      )} */}
      <MyNavbar
        ref={navRef}
        shownotice={showTopBar.toString()}
        noticeheight={topNoticeHeight}
      >
        <div className="container-fluid" style={{padding: "0"}}>
          <NavbarContainer>
            <Logo>
              <Link href={isAuth ? USER_DEFAULT_PATH : "/"}>
                <Image
                  width={190}
                  height={64}
                  src="/logo-color.svg"
                  alt="logo"
                  className="img-fluid logo-color"
                  style={{paddingTop: '15px !important'}}
                />
              </Link>
            </Logo>
            <NavList>
              <ul>
                <NavItem link="/app/paraphrasing" title="App" />
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
                {/* {!isAuth && <NavItem link="/ai-blog-generator" title="Blog" />} */}
                <NavItem link="/user-pricing" title="Pricing" />
                {/* <NavItem link="/affiliates" title="Affiliates" /> */}
                <NavComDropdownMenuItem
                  isOpen={comIsOpen}
                  toggle={comToggle}
                  MenuName="Community"
                />
              </ul>
            </NavList>

            <MobileToogle
              onClick={toggleSidebar}
            ><i><FaBars/></i></MobileToogle>

            {!isAuth && (
              <NavbarMenu>
                <NavList>
                  <NavItem link="/signin" title="Sign in" />
                  <NavItem link="/signup" title="Sign up" />
                </NavList>
              </NavbarMenu>
            )}

            {isAuth && (
              <NavbarMenu>
                <DropdownOptions isOpen={isOpen} toggle={toggle}>
                  <DropdownToggleOptions
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={isOpen}
                    style={{float: "right"}}
                  >
                    <DropdownAvatar>
                      {profileAvatar ? (
                        <AvatarImg src={profileAvatar} alt={fullName} />
                      ) : (
                        <FirstCharAvatar>{firstName.charAt(0)}</FirstCharAvatar>
                      )}
                      <span>{fullName}</span>
                      <i style={{ paddingLeft: "5px" }}><FaChevronDown/></i>
                    </DropdownAvatar>
                  </DropdownToggleOptions>
                  <NavDropdownMenu userMenu="true">
                    <NavDropdownItem tag="div">
                      <Link href="/bookmarks">
                        <a>
                          <i style={{ paddingRight: "5px" }}><FaUser/></i> My account
                        </a>
                      </Link>
                    </NavDropdownItem>
                    <NavDropdownItem tag="div" onClick={handleSignout}>
                      <i style={{ paddingRight: "5px" }}><FaSignOutAlt/></i> Log out
                    </NavDropdownItem>
                  </NavDropdownMenu>
                </DropdownOptions>
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
  display: none;
  position: absolute;
  right: ${({ userMenu }) => userMenu === "true" ? "0px" : "auto"} !important;
  left: ${({ userMenu }) => userMenu === "true" ? "auto" : "0px"} !important;
  transform: translate3d(0px, 35px, 0px) !important;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 5px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
  padding: 0px;
  margin: 0px;

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 850px) {
    font-size: 13px;
  }

  a {
    color: black;
    &:hover {
      color: black;
      text-decoration: none;
    }
  }
`;

const DropdownOptions = styled(Dropdown)`
  position: relative;
  display: inline-block;
  right: 0;
`;

const DropdownToggleOptions = styled(DropdownToggle)`
  color: black;
  cursor: pointer;

  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

const NavDropdownMenus = styled(DropdownMenu)`
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  top: 25px !important;

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 850px) {
    font-size: 13px;
  }

  a {
    color: black;
    &:hover {
      color: gray;
      text-decoration: none;
    }
  }
`;

const NavDropdownItem = styled(DropdownItem)`
  color: black;
  cursor: pointer;
  padding: 1rem 3.5rem 1rem 1.2rem;
  
  &:hover {
    color: black;
    background-color: #f1f1f1;
  }

  &:active {
    color: black;
    background-color: #f1f1f1;
  }
`;

const MyNavbar = styled.nav`
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
  height: 80px;
  align-items: center;
  font-size: 16px;

  margin-top: ${({ shownotice, noticeheight }) =>
    shownotice === "true" ? `${noticeheight}px` : `${0}px`};

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 850px) {
    font-size: 13px;
  }

  @media (min-width: 768px) {
    padding: 35px 0px;
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
  margin: 2rem;

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

  @media (max-width: 992px) {
    height: 32px;
  }
`;

const NavList = styled.div`
  align-self: center;

  li {
    float: left;
    list-style-type: none;
    padding: 0 16px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const NavItemLink = styled.a`
  display: block;
  color: black;
  text-align: center;

  text-decoration: none;

  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

const MobileToogle = styled.span`
  align-self: center;
  color: black;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 0;
  padding: 0px 8px;
  border: 2px solid #8d8d8d;
  border-radius: 5px;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

const FirstCharAvatar = styled.span`
  align-items: center;
  // background-color: #e69500;
  background-color: rgba(15, 160, 152, 1);
  border-radius: 50%;
  color: white !important;
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

  @media (max-width: 1000px) {
    display: none;
  }
`;

const DropdownAvatar = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;

  span {
    margin-left: 5px;
    color: black;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  height: 20px;
  object-fit: contain;
  width: 20px;
`;

const Badge = styled.span`
  background-color: #10a37f;
  color: #fff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px 15px;
  font-size: 13px;
  font-weight: 600;
`;

export default AppHeader;
