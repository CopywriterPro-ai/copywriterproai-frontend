import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Image from "next/image";

import PersonOne from "@/assets/images/testimonial/one.png";
import PersonTwo from "@/assets/images/testimonial/two.png";

const datas = [
  {
    text: "“I have been using CopywriterPro for a month now and I have to say it is an amazing tool. I have been using it to write some articles for my website and I have to say that the results are very good. The software is very easy to use and it has a lot of features that make the process of writing an article very simple. I would highly recommend it to anyone who is looking for a good copywriting tool.”",
    img: PersonOne,
    name: "Vallery Lancey",
    company: "Founder at Active Marketing Agency",
  },
  {
    text: "“It's the best tool I didn't know I needed until I used it. Saved countless hours and headbanging with the help of copywriterpro.ai. It has been serving as my personal writing specialist. Saved all the time thinking of what to write. Simply solved all my writing needs. From writing catchy Ad headlines to attention grabbing SEO friendly articles this tool helped me write them with minimal effort and with the best outcome. So happy with this service.”",
    img: PersonTwo,
    name: "Rashed Mazumder",
    company: "CTO, Gold Lavender Co. Ltd.",
  },
];

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SignupCarousel = () => {
  return (
    <Container>
      <h4>Start Copywriting For Free!</h4>
      <Slider {...settings}>
        {datas.map((person, index) => (
          <div key={index}>
            <TestimonialContainer>
              <TestimonialText>
                <p>{person.text}</p>
              </TestimonialText>
              <TestimonialPerson>
                <Image
                  height={50}
                  width={50}
                  layout="fixed"
                  src={person.img.src}
                  alt="person"
                />
                <PersonDetails>
                  <p>{person.name}</p>
                  <p>{person.company}</p>
                </PersonDetails>
              </TestimonialPerson>
            </TestimonialContainer>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  color: #bfbfbf;
  text-align: center;

  h4 {
    font-size: 36px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    h4 {
      font-size: 30px;
      font-weight: 600;
    }
  }
`;

const TestimonialContainer = styled.div`
  font-family: "Myriad Pro";
  max-width: 85%;
  padding-top: 15vh;
  padding-bottom: 15vh;
  margin: 0 auto;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
`;

const TestimonialText = styled.div``;

const TestimonialPerson = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const PersonDetails = styled.div`
  p {
    margin: 0;
    padding: 0;
    margin-left: 10px;
  }
`;

export default SignupCarousel;
