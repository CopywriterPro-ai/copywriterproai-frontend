import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Paginate from "react-paginate";

import { UserLayout as Layout } from "@/layout";
import {
  UpdatePasswordModal,
  UpdateEmailModal,
  UpdateNameModal,
} from "@/components/modals/update";
import { MainSidebar } from "@/components/sidebar";
import { useResponsive } from "@/hooks";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { getBookmarks, selectors as userSelector } from "@/redux/slices/user";
import { selectors as authSelector } from "@/redux/slices/auth";
import Spinner from "@/components/common/Spinner";

const ContentItem = ({ item }) => {
  const { tool, input, output } = item;

  return (
    <ContentBody>
      <ContentBodyTool>{tool}</ContentBodyTool>
      <ContentBodyInput>
        <TextTitle>Input</TextTitle>
        {input}
      </ContentBodyInput>
      <ContentBodyOutput>
        <TextTitle>Output</TextTitle>
        <ul>
          {output.map((content, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul>
      </ContentBodyOutput>
    </ContentBody>
  );
};

const TextTitle = styled.p`
  display: block;
  font-weight: 500;
  padding: 10px 0;
  margin: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ContentBody = styled.div`
  display: flex;
  font-size: 14px;
  padding: 1rem 0;
  border-bottom: 1px solid #b4b4b4;

  @media (max-width: 768px) {
    flex-direction: column;
    border: 0;
    padding: 0;
    padding-bottom: 10px;
  }
`;

const ContentBodyTool = styled.div`
  flex: 2;
  padding: 0.2rem;

  @media (max-width: 768px) {
    padding: 0;
    background-color: #3a4841;
    color: #ffffff;
    margin-left: -15px;
    margin-right: -15px;
    padding: 10px 15px;
  }
`;

const ContentBodyInput = styled.div`
  flex: 4;
  padding: 0.2rem;

  @media (max-width: 768px) {
    padding-bottom: 10px;
    border-bottom: 1px solid #b4b4b4;
  }
`;

const ContentBodyOutput = styled.div`
  flex: 6;
  padding: 0.2rem;

  @media (max-width: 768px) {
    /* margin-top: 15px; */
  }
  ul {
    padding-left: 15px;
    list-style-type: circle;

    li {
      padding: 5px 0;
    }
  }
`;

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const { bookmark: isBookmark } = useSelector(uiSelector.getSidebar);
  const bookmarks = useSelector(userSelector.getBookmarks);
  const { id: userId } = useSelector(authSelector.getInfo);

  let showSidebar = !isMobile || isBookmark;
  let showContent = !isMobile || !showSidebar;

  let limit = 10;

  useEffect(() => {
    dispatch(getBookmarks({ userId, limit }));
  }, [dispatch, limit, userId]);

  const { loading, items, totalpages } = bookmarks;

  const handlePageClick = ({ selected }) => {
    let page = selected + 1;
    dispatch(getBookmarks({ userId, page, limit }));
  };

  const isPending = loading === "pending";

  return (
    <Layout>
      <main className="container-fluid">
        <div className="row">
          {showSidebar && <MainSidebar />}
          {showContent && (
            <div className="col-md-9">
              <ContentTitle>
                <p>Bookmarks</p>
                <SearchBar>
                  <label htmlFor="search" className="fas fa-search"></label>
                  <input
                    name="search"
                    id="search"
                    type="text"
                    placeholder="Seach"
                    autoComplete="off"
                  />
                </SearchBar>
              </ContentTitle>
              {isPending && <Spinner />}
              {!isPending && (
                <MainContent>
                  <ContentHeader>
                    <div style={{ flex: "2" }}>Tool</div>
                    <div style={{ flex: "4" }}>Input</div>
                    <div style={{ flex: "6" }}>Output</div>
                  </ContentHeader>
                  {items.length > 0 &&
                    items.map((item, index) => (
                      <ContentItem key={index} item={item} />
                    ))}
                </MainContent>
              )}

              {items.length > 0 && (
                <PaginateContent>
                  <Paginate
                    previousLabel={null}
                    nextLabel={null}
                    breakLabel={
                      <BreakDot>
                        <Dot />
                        <Dot />
                        <Dot />
                      </BreakDot>
                    }
                    breakClassName={"break-me"}
                    pageCount={totalpages}
                    pageClassName={"bookmark-pagination-li"}
                    pageLinkClassName={"bookmark-pagination-li-a"}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active-pagi"}
                  />
                </PaginateContent>
              )}
            </div>
          )}
        </div>
        <UpdatePasswordModal />
        <UpdateEmailModal />
        <UpdateNameModal />
      </main>
    </Layout>
  );
};

const ContentTitle = styled.div`
  align-items: center;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  padding: 0.6rem;

  p {
    flex: 4;
    font-size: 23px;
    line-height: 34px;
    margin: 0.2rem 0;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0;

    p {
      flex: none;
      font-size: 16px;
      line-height: 34px;
    }
  }
`;

const SearchBar = styled.div`
  color: #b4b4b4;
  flex: 8;
  font-size: 16px;

  label {
    color: #b4b4b4;
    font-size: 14px;
    padding-right: 5px;
  }

  input {
    border: none;
    outline: none;
    padding: 0 5px;
    max-width: 250px;
    height: 2rem;

    &::placeholder {
      color: #b4b4b4;
    }
    &:focus {
      box-shadow: inset 0px -1px 0px #b4b4b4;
    }
  }

  @media (max-width: 768px) {
    flex: none;
    input {
      max-width: 150px;
    }
  }
`;

const MainContent = styled.div`
  margin: 2rem 1rem;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginateContent = styled.div`
  .pagination {
    justify-content: center;
  }

  .bookmark-pagination-li {
    background-color: #3a4841;
    border-radius: 5px;
    margin: 0 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    user-select: none;
  }

  .bookmark-pagination-li-a {
    color: white;
    padding: 5px 15px;

    &:hover {
      text-decoration: none;
    }
  }

  .break-me {
    align-self: center;
  }

  .active-pagi {
    background-color: #46ae97;
  }
`;

const BreakDot = styled.div`
  display: flex;
`;

const Dot = styled.span`
  padding: 3px;
  background-color: #3a4841;
  border-radius: 50%;
  margin: 0 5px;
`;

export default Bookmarks;
