import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Paginate from "react-paginate";
import { useRouter } from "next/router";

import { UserLayout as Layout } from "@/layout";
import { BlogDeleteModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import { useResponsive } from "@/hooks";
import { setBlogDeleteModal, selectors as uiSelector } from "redux/slices/ui";
import {
  getBlogs,
  setBlogCurrentId,
  setCurrentBlogEditItem,
  setBlogCurrentItem,
  selectors as blogSelector,
} from "redux/slices/blog";
import Spinner from "components/common/Spinner";
import { deltaToPlainText } from "utils/quillValueConvert";

const TEXT_EXCERPT = 250;

const SingleDraft = ({ item }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const parseItem = { ...item, blogPost: JSON.parse(item.blogPost) };
  const { headline, blogPost } = parseItem;
  const { text } = deltaToPlainText(blogPost, TEXT_EXCERPT);

  const handleDeleteBlog = () => {
    dispatch(setBlogCurrentId(parseItem.id));
    dispatch(setBlogDeleteModal(true));
  };

  const handleEditBlog = () => {
    dispatch(setBlogCurrentId(parseItem.id));
    dispatch(setCurrentBlogEditItem(parseItem));
    dispatch(setBlogCurrentItem(parseItem));
    router.push(`/ai-blog-generator`);
  };

  return (
    <ContentBody className="col-md-6">
      <Card className="card">
        <CardHeader>
          <strong>{headline}</strong>
          <p>12:00 PM, 4th August, 2021</p>
        </CardHeader>
        <CardBody>
          <p>{text}</p>
        </CardBody>
        <CardFooter>
          <CardButtonGroup>
            <button onClick={handleEditBlog}>Edit</button>
            <button onClick={handleDeleteBlog}>Delete</button>
          </CardButtonGroup>
        </CardFooter>
      </Card>
    </ContentBody>
  );
};

const ContentBody = styled.div``;

const Card = styled.div`
  border: 0;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  margin: 8px 0px;
  min-height: 200px;
  padding: 10px;
  position: relative;
`;

const CardHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-bottom: 5px;

  strong {
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
  }
  p {
    color: #7e7e7e;
    font-size: 13px;
    font-weight: 500;
    margin: 0;
  }
`;

const CardBody = styled.div`
  p {
    color: #4b4b4b;
    font-size: 12px;
    line-height: 18px;
    margin: 8px 0;
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const CardButtonGroup = styled.div`
  button {
    background-color: white;
    border-radius: 3px;
    border: 1.5px solid #666666;
    margin-left: 5px;
    min-width: 70px;
    outline: 0;
  }
`;

const Draft = () => {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const { bookmark: isBookmark } = useSelector(uiSelector.getSidebar);
  const blogs = useSelector(blogSelector.getBlogs());

  let showSidebar = !isMobile || isBookmark;
  let showContent = !isMobile || !showSidebar;

  let limit = 10;

  useEffect(() => {
    dispatch(
      getBlogs({ params: { sortBy: "updatedAt:desc", limit, page: 1 } })
    );
  }, [dispatch, limit]);

  const { loading, items, meta } = blogs;

  const handlePageClick = ({ selected }) => {
    let page = selected + 1;
    dispatch(getBlogs({ params: { sortBy: "updatedAt:desc", limit, page } }));
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
                <p>Draft</p>
              </ContentTitle>
              {isPending && <Spinner />}
              {!isPending && (
                <MainContent>
                  <div className="row">
                    {items.length > 0 &&
                      items.map((item, index) => (
                        <SingleDraft key={index} item={item} />
                      ))}
                  </div>
                </MainContent>
              )}
              {!isPending && !items.length && (
                <EmptyDraft>
                  <p>You don&apos;t have any saved blog posts.</p>
                </EmptyDraft>
              )}

              {meta?.totalPages > 1 && (
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
                    pageCount={meta?.totalPages}
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
        <BlogDeleteModal />
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

const MainContent = styled.div`
  margin: 2rem 1rem;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const EmptyDraft = styled.div`
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 500;
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

export default Draft;
