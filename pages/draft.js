import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Paginate from "react-paginate";
import { useRouter } from "next/router";

import { UserLayout as Layout } from "@/layout";
import { BlogDeleteModal } from "@/components/modals/blogs";
import { MainSidebar } from "@/components/sidebar";
import { useResponsive, useAuth } from "@/hooks";
import { setBlogDeleteModal, selectors as uiSelector } from "redux/slices/ui";
import {
  setBlogsDraft,
  getBlogs,
  selectors as draftSelector,
} from "@/redux/slices/draft";
import { setEditorDefault as setEditorCompleteBlogDefault } from "@/redux/slices/completeBlog";
import { writeAlongActions } from "@/redux/slices/blog";
import Processing from "@/pages/Loading";
import { deltaToPlainText } from "utils/quillValueConvert";

const TEXT_EXCERPT = 250;

const SingleDraft = ({ item }) => {
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const router = useRouter();

  const parseItem = { ...item, blogPost: JSON.parse(item.blogPost) };
  const { headline, blogPost, id, blogType, blogAbout, updatedAt } = parseItem;
  const { text } = deltaToPlainText(blogPost, TEXT_EXCERPT);

  const handleDeleteBlog = () => {
    dispatch(setBlogsDraft({ activeId: id }));
    dispatch(setBlogDeleteModal(true));
  };

  const handleEditBlog = () => {
    dispatch(setBlogsDraft({ activeId: id, item: parseItem }));
    if (blogType === "WRITE_ALONG") {
      dispatch(
        writeAlongActions.setEditorDefault({
          headline,
          about: blogAbout,
          body: blogPost,
          currentid: id,
        })
      );
      // { headline, about, body, currentid, intro, outline }
      router.push(`/app/ai-write-along`);
    } else if (blogType === "GHOSTWRITER") {
      dispatch(
        setEditorCompleteBlogDefault({
          headline,
          about: blogAbout,
          body: blogPost,
          currentid: id,
        })
      );
      router.push(`/app/ai-ghostwriter`);
    }
  };

  return (
    <ContentBody className={`${isMobile} ? "col-md-12" : "col-md-6" col-lg-6 d-flex align-items-stretch mb-2`}>
      <Card className="card">
        <CardHeader>
          <strong>{headline}</strong>
        </CardHeader>
        <CardBody>
          <p>{text}</p>
        </CardBody>
        <CardFooter>
          <p>Last edited: {updatedAt}</p>
          <CardButtonGroup>
            <button onClick={handleEditBlog}>Edit</button>
            <button onClick={handleDeleteBlog}>Delete</button>
          </CardButtonGroup>
        </CardFooter>
      </Card>
    </ContentBody>
  );
};

const ContentBody = styled.div`
  
`;

const Card = styled.div`
  border: 0;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  margin: 8px 0px;
  min-height: 200px;
  padding: 10px;
  position: relative;
  padding: 2rem;
`;

const CardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-bottom: 5px;
  font-size: 18px;

  strong {
    font-weight: 600;
    line-height: 22px;
  }
  p {
    color: #7e7e7e;
    font-weight: 500;
    margin: 0;
  }
`;

const CardBody = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  p {
    color: #4b4b4b;
    font-size: 15px;
    line-height: 25px;
    margin: 8px 0;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

const CardButtonGroup = styled.div`
  button {
    background-color: white;
    border-radius: 3px;
    border: 1.5px solid #666666;
    margin-left: 5px;
    outline: 0;
    font-size: 15px;
    padding: 0 10px;
  }
`;

const Draft = () => {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const { isAuth, isRehydrated } = useAuth();
  const { bookmark: isBookmark } = useSelector(uiSelector.getSidebar);
  const blogs = useSelector(draftSelector.getDraftBlogs());

  let showSidebar = !isMobile || isBookmark;
  let showContent = !isMobile || !showSidebar;

  let limit = 10;

  useEffect(() => {
    isAuth &&
      isRehydrated &&
      dispatch(
        getBlogs({ params: { sortBy: "updatedAt:desc", limit, page: 1 } })
      );
  }, [dispatch, isAuth, isRehydrated, limit]);

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
            <div className={isMobile ? "col-md-12" : "col-md-9"}>
              <ContentTitle>
                <p>Draft</p>
              </ContentTitle>
              {isPending && <Processing color="#000" />}
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

  @media (max-width: 1000px) {
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
  @media (max-width: 1000px) {
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
