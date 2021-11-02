import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
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
      className={`far ${
        isFavouriteTools ? "fa-minus-square" : "fa-plus-square"
      } `}
      onClick={handleUpdateFavouriteTools}
    ></span>
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
    dispatch(setCurrentActiveKeyState(key));
    router.push({
      pathname: `/app/${key}`,
    });
    dispatch(setContentSidebar(false));
  };

  const handleToggleSidebar = (value) => {
    dispatch(setContentSidebar(value));
  };

  const hasSearchResult = searchResult.length !== 0;
  const noSearchResult = !hasSearchResult && query.length !== 0;
  const { width: windowWidth } = useWindowSize();

  return (
    <ProSidebar
      width={`${windowWidth >= 1000 ? "auto" : "250px"}`}
      breakPoint="lg"
      toggled={toggled}
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <SearchTools>
          <label htmlFor="search" className="fas fa-search"></label>
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
      </SidebarHeader>
      <SidebarContent>
        {noSearchResult && (
          <p style={{ padding: "8px 17px 8px 15px", wordWrap: "break-word" }}>
            No results found{" "}
            <span style={{ fontWeight: "bolder" }}>{query}</span>
          </p>
        )}
        {hasSearchResult && (
          <>
            <Menu>
              <SidebarTitle>Search Results</SidebarTitle>
              {searchResult.map((tool) => (
                <MenuItemStyle
                  style={{ paddingLeft: "10px" }}
                  key={tool.key}
                  suffix={<FavouriteAction itemKey={tool.key} />}
                  onClick={() => handleActiveItem(tool.key)}
                >
                  {tool.name}
                </MenuItemStyle>
              ))}
            </Menu>
            <HR />
          </>
        )}

        {isAuth && (
          <>
            <Menu>
              <SidebarTitle>Favourite Tools</SidebarTitle>
              {favouriteTools.map((tool) => (
                <MenuItemStyle
                  style={{ paddingLeft: "10px" }}
                  key={tool.key}
                  suffix={<FavouriteAction itemKey={tool.key} />}
                  onClick={() => handleActiveItem(tool.key)}
                >
                  {tool.name}
                </MenuItemStyle>
              ))}
            </Menu>
            <HR />
          </>
        )}
        <Menu>
          <SidebarTitle>Writing Tools</SidebarTitle>
          {categoriesContent.map((group) => (
            <SubMenu
              key={group.key}
              title={group.name}
              icon={
                <IconImg src={`${group?.icon?.src}`} alt={group.key}></IconImg>
              }
            >
              {group.tools.map((item, index) => (
                <MenuItemStyle
                  suffix={<FavouriteAction itemKey={item.key} />}
                  active={item.key === activeKey}
                  key={index}
                  title={item.name}
                  onClick={() => handleActiveItem(item.key)}
                >
                  {item.name}
                </MenuItemStyle>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

const MenuItemStyle = styled(MenuItem)`
  user-select: none;

  .pro-inner-item {
    padding: 8px 17px 8px 15px !important;
    &::before {
      content: none !important;
    }
  }
`;

const SidebarTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 30px;
  padding-left: 25px;
`;

const SearchTools = styled.div`
  padding: 10px 0 10px 25px;

  label {
    padding-right: 10px;
    color: #b4b4b4;
  }
  input {
    width: 80%;
    border: 0;
    outline: 0;
    box-shadow: inset 0px -1px 0px #b4b4b4;
  }
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`;

const HR = styled.hr``;

export default GenerateSidebar;
