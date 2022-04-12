import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Collapse } from "reactstrap";

import externalLink from "@/data/externallink.json";
import { postUserLogout } from "@/redux/slices/auth";
import {
  getSubscriptions,
  postCustomerPortal,
  selectors as paymentSelector,
} from "@/redux/slices/payment";
import { setSubscriptionsCancelModal } from "@/redux/slices/ui";
import SubscriberModal from "@/components/modals/subscriptions/plan";
import { useResponsive, useUser } from "@/hooks";

const MainSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { authToken, isAuth, subscribe, userInfo, isRehydrated } = useUser();
  const { firstName, lastName, email, profileAvatar } = userInfo;
  const fullName = `${firstName} ${lastName}`;
  const {
    refreshToken: { token },
  } = authToken;
  const [blogDrop, setBlogDrop] = useState(false);
  const [redirectURL, setRedirectURL] = useState(null);
  const [loadingManageSubs, setLoadingManageSubs] = useState(false);
  const { items: subscriptions } = useSelector(paymentSelector.getSubscription);

  const handleShowSubscriptionsCancelModal = () => {
    dispatch(setSubscriptionsCancelModal(true));
  };

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
    isRehydrated && isAuth && dispatch(getSubscriptions({ status: "active" }));
  }, [dispatch, isAuth, isRehydrated]);

  useEffect(() => {
    if (redirectURL) window.location.href = redirectURL;
  }, [redirectURL]);

  const handleCreateCustomerPortal = () => {
    setLoadingManageSubs(true);
    !loadingManageSubs &&
      dispatch(postCustomerPortal()).then(({ payload }) =>
        setRedirectURL(payload.data)
      );
  };

  return (
    <Sidebar className="col-md-3">
      <SidebarContainer>
        {isAuth && (
          <SidebarUser>
            <p className="sidebar-premium">
              {subscribe.subscriberInfo.isPaidSubscribers
                ? "Premium "
                : "Freemium "}
              Account
            </p>
            <SidebarUserAvatar>
              {profileAvatar ? (
                <AvatarImg src={profileAvatar} alt={fullName} />
              ) : (
                <FirstCharAvatar>{firstName?.charAt(0)}</FirstCharAvatar>
              )}

              <span>{fullName}</span>
            </SidebarUserAvatar>
            <p className="sidebar-email">{email}</p>
            {isMobile && (
              <StyledLogoutButton onClick={handleSignout}>
                Logout
              </StyledLogoutButton>
            )}
          </SidebarUser>
        )}

        <SidebarUserAction>
          {!isAuth && (
            <>
              <Link href="/signin" passHref>
                <UserActionLink>Signin</UserActionLink>
              </Link>
              <Link href="/signup" passHref>
                <UserActionLink>Signup</UserActionLink>
              </Link>
            </>
          )}

          {isAuth && (
            <>
              <div>
                <p>Plan</p>
                {subscriptions.length > 0 && (
                  <div>
                    <StyledPlanBtn onClick={handleShowSubscriptionsCancelModal}>
                      Switch Subscriptions
                    </StyledPlanBtn>
                    <StyledPlanBtn onClick={handleCreateCustomerPortal}>
                      {loadingManageSubs ? "Loading..." : "Manage Subscription"}
                    </StyledPlanBtn>
                  </div>
                )}
              </div>
              <DropDownMenuTitle
                onClick={() => setBlogDrop((prevState) => !prevState)}
              >
                Blog
              </DropDownMenuTitle>
              <Collapse isOpen={blogDrop}>
                <DropDownList>
                  <li>
                    <Link href="/app/ai-write-along" passHref>
                      <UserActionLink>Blog writer (Write along)</UserActionLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/app/ai-ghostwriter" passHref>
                      <UserActionLink>Blog writer (Ghostwriter)</UserActionLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/draft" passHref>
                      <UserActionLink>Drafts</UserActionLink>
                    </Link>
                  </li>
                </DropDownList>
              </Collapse>
              {/* <Link href="/app" passHref>
                <UserActionLink>Generate Copy</UserActionLink>
              </Link> */}
              <Link href="/bookmarks" passHref>
                <UserActionLink>Bookmarks</UserActionLink>
              </Link>
            </>
          )}
          <Link href="/pricing" passHref>
            <UserActionLink>Pricing</UserActionLink>
          </Link>
        </SidebarUserAction>
        <Community>
          <p>Community</p>
          <ul>
            <li>
              <a href={externalLink.facebookGroup} target="__blank">
                Facebook Group
              </a>
            </li>
            <li>
              <a href={externalLink.discord}>Discord Server</a>
            </li>
            <li>
              <a href={externalLink.twitter}>Twitter Account</a>
            </li>
          </ul>
        </Community>
      </SidebarContainer>
      <SubscriberModal />
    </Sidebar>
  );
};

const SidebarLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

const UserActionLink = styled(SidebarLink)`
  color: #000;
  font-weight: 500;

  &:hover {
    color: #000;
  }
`;

const Sidebar = styled.div`
  border-right: 1px solid #b4b4b4;
  min-height: 100vh;

  @media (max-width: 768px) {
    border: 0;
  }
`;

const DropDownMenuTitle = styled.p`
  color: #000;
  cursor: pointer;
  font-weight: 500;
`;

const DropDownList = styled.ul`
  list-style: none;
  padding-left: 5px;
`;

const SidebarContainer = styled.div`
  padding-top: 1rem;
  padding-left: 0.5rem;
`;

const SidebarSection = styled.div`
  border-bottom: 1px solid #b4b4b4;
  padding: 1.2rem 0;

  p {
    margin: 0;
  }
`;

const SidebarUser = styled(SidebarSection)`
  .sidebar-premium {
    font-size: 17px;
    font-weight: 500;
  }
  .sidebar-email {
    font-size: 14px;
    margin-top: 0.5rem;
  }
`;

const SidebarUserAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  span {
    margin-left: 0.5rem;
    font-size: 20px;
    font-weight: 500;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  height: 20px;
  object-fit: contain;
  width: 20px;
`;

const StyledLogoutButton = styled.button`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  margin-top: 10px;
  outline: 0;
  padding: 4px 15px;
`;

const FirstCharAvatar = styled.div`
  align-items: center;
  background-color: #13b567;
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 20px;
  justify-content: center;
  text-transform: uppercase;
  width: 20px;
`;

const SidebarUserAction = styled(SidebarSection)`
  display: flex;
  flex-direction: column;
  min-height: 6rem;
  justify-content: space-between;
`;

const Community = styled(SidebarSection)`
  border: 0;
  p {
    font-weight: 500;
  }
  ul {
    list-style-type: none;
    padding: 0;

    li {
      font-size: 14px;
      margin: 5px 0;

      a {
        color: black;
        text-decoration: none;
      }
    }
  }
`;

const StyledPlanBtn = styled.button`
  display: block;
  margin: 5px 0;
  background-color: white;
  border: 1.5px solid #3a4841;
  padding: 3px 10px;
  border-radius: 3px;
  line-height: 22px;
  justify-content: center;
`;

export default MainSidebar;
