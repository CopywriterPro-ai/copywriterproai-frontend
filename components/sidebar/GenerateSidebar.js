import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { Badge } from "reactstrap";
import styled from "styled-components";
import { useRouter } from "next/router";

import {
  setCurrentActiveKeyState,
  selectors as contentSelector,
} from "@/redux/slices/content";
import {
  updateFavouriteTools,
  selectors as userSelector,
} from "@/redux/slices/user";
import {
  setContentSidebar,
  setSigninModal,
  selectors as uiSelector,
} from "@/redux/slices/ui";
import { useWindowSize, useUser } from "@/hooks";

import {FaSearch} from 'react-icons/fa';
import {BsFillPinAngleFill, BsFillPinFill} from 'react-icons/bs';

const BLOG_CATEGORY_KEY = "blog";

const FavouriteAction = ({ itemKey }) => {
  const dispatch = useDispatch();
  const isFavouriteTools = useSelector(userSelector.isFavouriteTools(itemKey));

  const { isAuth } = useUser();

  const handleUpdateFavouriteTools = () => {
    if (!isAuth) {
      dispatch(setSigninModal(true));
      return;
    }

    dispatch(
      updateFavouriteTools({
        data: {
          tool: itemKey,
        },
      })
    );
  };

  return (
    <span
      style={{ marginLeft: "15px" }}
      title={`${isFavouriteTools ? "Remove from" : "Add to"} Favourite`}
      onClick={handleUpdateFavouriteTools}
    ><i>{isFavouriteTools ? <BsFillPinFill/> : <BsFillPinAngleFill/>}</i></span>
  );
};

const GenerateSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const searchResult = useSelector(contentSelector.getContentSearch(query));
  const categoriesContent = useSelector(contentSelector.getCategorywithTools());
  const activeKey = useSelector(contentSelector.getCurrentActiveKey());
  const favouriteTools = useSelector(
    userSelector.getFavouriteToolsWithDetails()
  );
  const { open: toggled } = useSelector(uiSelector.getContentSidebar);
  const { isAuth } = useUser();

  const handleActiveItem = (key) => {
    if (key === "blog-writing") {
      router.push({
        pathname: `/app/ai-write-along`,
      });
    } else if (key === "complete-blog") {
      router.push({
        pathname: `/app/ai-ghostwriter`,
      });
    } else {
      dispatch(setCurrentActiveKeyState(key));
      router.push({
        pathname: `/app/${key}`,
      });
      dispatch(setContentSidebar(false));
    }
  };

  const handleToggleSidebar = (value) => {
    dispatch(setContentSidebar(value));
  };

  const toolsCategories = useMemo(() => {
    return categoriesContent.filter(
      (category) => category.key !== BLOG_CATEGORY_KEY
    );
  }, [categoriesContent]);

  const blogTool = useMemo(() => {
    const tools = categoriesContent.filter(
      (category) => category.key === BLOG_CATEGORY_KEY
    );
    return Array.isArray(tools) && tools[0] ? tools[0] : {};
  }, [categoriesContent]);

  const hasSearchResult = searchResult.length !== 0;
  const noSearchResult = !hasSearchResult && query.length !== 0;
  const { width: windowWidth } = useWindowSize();

  return (
    <SidebarContainer
      width={`${windowWidth >= 1000 ? "auto" : "250px"}`}
      breakPoint="lg"
      toggled={toggled}
      onToggle={handleToggleSidebar}
    >
      <CustomSidebarHeader>
        <SearchTools>
          <label htmlFor="search"><i><FaSearch/></i></label>
          <input
            type="text"
            name="search"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search"
          />
        </SearchTools>
      </CustomSidebarHeader>
      <Content>
        {noSearchResult && (
          <p style={{ padding: "8px 17px 8px 15px", wordWrap: "break-word" }}>
            No results found{" "}
            <span style={{ fontWeight: "bolder" }}>{query}</span>
          </p>
        )}
        {hasSearchResult && (
          <>
            <CustomMenu>
              <SidebarTitle>Search Results</SidebarTitle>
              {searchResult.map((tool) => (
                <MenuItemStyle
                  key={tool.key}
                  suffix={<FavouriteAction itemKey={tool.key} />}
                  onClick={() => handleActiveItem(tool.key)}
                >
                  {tool.name}
                </MenuItemStyle>
              ))}
            </CustomMenu>
            {/* <HR /> */}
          </>
        )}

        {isAuth && (
          <>
            <CustomMenu>
              <SidebarTitle>Pinned Tools</SidebarTitle>
              {favouriteTools.map((tool) => (
                <MenuItemStyle
                  key={tool.key}
                  suffix={<FavouriteAction itemKey={tool.key} />}
                  onClick={() => handleActiveItem(tool.key)}
                >
                  {tool.name}
                </MenuItemStyle>
              ))}
            </CustomMenu>
            {/* <HR /> */}
          </>
        )}
        {blogTool?.tools && (
          <>
            <CustomMenu>
              <SidebarTitle>Blog Writer</SidebarTitle>
              {blogTool?.tools.map((item, index) => (
                <MenuItemStyle
                  suffix={<FavouriteAction itemKey={item.key} />}
                  active={item.key === activeKey}
                  key={index}
                  title={item.name}
                  onClick={() => handleActiveItem(item.key)}
                >
                  {item.name}
                  {item.key === "complete-blog" && (
                    <Badge color="warning">New</Badge>
                  )}
                </MenuItemStyle>
              ))}
            </CustomMenu>
            {/* <HR /> */}
          </>
        )}
        {toolsCategories.length > 0 && (
          <CustomMenu
            style={{borderBottom: "none"}}
          >
            <SidebarTitle>Writing Tools</SidebarTitle>
            {toolsCategories.map((group) => (
              <CustomSubMenu
                key={group.key}
                title={group.name}
                icon={
                  <IconImg
                    src={`${group?.icon?.src}`}
                    alt={group.key}
                  ></IconImg>
                }
                style={{padding: "20px 0px 8px 0px !important"}}
              >
                {group.tools.map((item, index) => (
                  <SubMenuItemStyle
                    suffix={<FavouriteAction itemKey={item.key} />}
                    active={item.key === activeKey}
                    key={index}
                    title={item.name}
                    onClick={() => handleActiveItem(item.key)}
                  >
                    {item.name}
                  </SubMenuItemStyle>
                ))}
              </CustomSubMenu>
            ))}
          </CustomMenu>
        )}
      </Content>
    </SidebarContainer>
  );
};

const SidebarContainer = styled(ProSidebar)`
  padding-top: 1rem;

  @media(max-width: 992px) {
    padding-top: 0;
  }
`;

const Content = styled(SidebarContent)`
  position: sticky;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
  }

  max-height: 80vh;

  // @media (min-width: 1200px) {
  //   min-height: 80vh;
  // }

  // @media (min-width: 1024px) {
  //   min-height: 80vh;
  // }

  // @media (min-width: 768px) {
  //   max-height: 80vh;
  // }
`;

const CustomSidebarHeader = styled(SidebarHeader)`
  padding: 0rem 2rem 1rem 2rem;

  @media(max-width: 992px) {
    padding-top: 1rem;
  }
`;

const CustomMenu = styled(Menu)`
  padding: 1rem 2rem 1rem 2rem !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const CustomSubMenu = styled(SubMenu)`
  .pro-inner-item {
    padding: 20px 0px 8px 0px !important;
    &::before {
      content: none !important;
    }

    .pro-arrow-wrapper {
      right: 4px !important;
    }
  }
`;

const MenuItemStyle = styled(MenuItem)`
  user-select: none;

  .pro-inner-item {
    padding: 20px 0px 8px 0px !important;
    &::before {
      content: none !important;
    }
  }
`;

const SubMenuItemStyle = styled(MenuItem)`
  user-select: none;

  .pro-inner-item {
    padding: 20px 0px 0px 0px !important;
    &::before {
      content: none !important;
    }
  }
`;

const SidebarTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 30px;
`;

const SearchTools = styled.div`
  label {
    padding-right: 10px;
    color: #b4b4b4;
  }
  input {
    width: 80%;
    border: 0;
    outline: 0;
  }
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`;

const HR = styled.hr``;

export default GenerateSidebar;
