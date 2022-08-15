import React from "react";
import Image from 'next/image'
import styled from "styled-components";
import SectionTitle from "@/components/common/SectionTitle";
import blogs from "data/resourceblogs.json";

import blogImageOne from "@/assets/images/blog/How AI can Help Make Your Writing Dreams a Reality.webp";
import blogImageTwo from "@/assets/images/blog/How You Can Make Money From Writing Killer Copy.webp";
import blogImageThree from "@/assets/images/blog/Why Right Copywriting Tools Can Make a Difference in Your Content Quality.webp";
import blogImageFour from "@/assets/images/blog/Best Books to Learn Copywriting in 2022.webp";

const blogImages = [ blogImageOne, blogImageTwo, blogImageThree, blogImageFour ];

const QuickAuth = () => {
  return (
    <Container>
      <SectionTitle title="Resources"/>
      <Blogs>
        {
          blogs.map(blog => (
            <Blog key={ blog.id }>
              <BlogLink href={blog.link} passHref target="_blank">
                <BlogContent>
                  <BlogImage
                    src={ blogImages[blog.id] }
                    alt={ blog.title }
                    layout="responsive"
                  />
                  <BlogTexts>
                    <BlogTitle> { blog.title } </BlogTitle>
                    <BlogAbout> { blog.about } </BlogAbout>
                    <BlogIntro> { blog.intro } </BlogIntro>
                  </BlogTexts>
                </BlogContent>
              </BlogLink>
            </Blog>
          ))
        }
      </Blogs>
      <ExploreMore>
        <BlogLink href="https://blog.copywriterpro.ai/" target="_blank">
          <BlogLinkContent>
            <span>Explore more resources</span>
            <i className="fas fa-arrow-right"></i>
          </BlogLinkContent>
        </BlogLink>
      </ExploreMore>
    </Container>
  );
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 6rem 3.5rem 5rem 3.5rem;
  font-size: 15.5px;
  // background-color: rgb(0, 30, 60);
  // background-color: #f3f1ee;

  @media (min-width: 1440px) {
    max-width: 1440px;
  }

  @media (max-width: 550px) {
    padding: 5rem 2rem 5rem 2rem;
  }
`;

const Blogs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 40px;
  column-gap: 40px;

  @media (max-width: 992px) {
    grid-template-row: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-row: repeat(4, 1fr);
    grid-template-columns: 1fr;
  }
`;

const Blog = styled.article`
  flex: 0 1 23%;

  // color: rgb(255, 255, 255);
  // transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  // border-radius: 10px;
  // border: 1px solid rgb(80, 144, 211);
  // background-color: rgb(19, 47, 76);
  // padding: 20px;

  color: #1A2027;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow-anchor: none;
  margin-bottom: 25px;
  box-shadow: 1px 1px 20px 0 rgb(90 105 120 / 20%);

  // &:hover {
  //   box-shadow: 1px 1px 20px 0 rgb(90 105 120 / 20%);
  // }
`;

const BlogContent = styled.div`

`;

const BlogImage = styled(Image)`
  border-radius: 10px 10px 0 0;
`;

const BlogTexts = styled.div`
  padding: 30px 20px 25px 20px;
`;

const BlogTitle = styled.h3`
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.5;
  // color: black;
  // color: #3498db;
  color: darkcyan;
`;

const BlogAbout = styled.p`
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 0;
  // color: rgba(255, 255, 255, .7);
  color: rgba(0, 0, 0, .7);
`;

const BlogIntro = styled.p`
  display: none;
`;

const ExploreMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3em;
`;

const BlogLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

const BlogLinkContent = styled.div`
  // color: #007ff;
  color: darkcyan;
  span {
    margin-right: 10px;
    font-size: 16px;
    font-weight: 600;

    @media (max-width: 560px) {
      font-size: 14px;
    }
  }
`;

export default QuickAuth;
