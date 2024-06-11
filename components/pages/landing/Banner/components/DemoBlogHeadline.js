import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  postLandingDemo,
  selectors as demoGenerateSelector,
} from "@/redux/slices/demoGenerate";
import {
  Container,
  Header,
  Body,
  Action,
  Scroll,
  InputSection,
  Title,
  Divider,
  TextArea,
  LiveActionContainer,
  Counter,
  ResultSection,
  DemoItem,
  TryAgain
} from "./style";
import Processing from "@/pages/Loading";
import { BLOG_HEADLINE } from "@/appconstants";

const MAX_LENGTH = 100;
const MIN_LENGTH = 10;

const DemoBlogHeadline = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [generate, setGenerate] = useState('pre-generate');

  const inputRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const textAreaRef = useRef(null);

  const {
    items: demoItems,
    task,
    loading,
  } = useSelector(demoGenerateSelector.getDemoGenerate);

  const inputLength = input.trim().length;

  const maxInput = MAX_LENGTH < inputLength;
  const minInput = MIN_LENGTH > inputLength;

  const limitFailed = maxInput || minInput;
  const isPending = loading === "pending";

  const handleGenerate = () => {
    if (!limitFailed && !isPending) {
      setGenerate('pending');
      dispatch(
        postLandingDemo({
          data: {
            task: BLOG_HEADLINE,
            blogAbout: input,
          },
        })
      ).then(({ payload }) => {
        if (payload.status === 200) {
          setGenerate('post-generate');
        }
      });
    } else {
      textAreaRef.current.focus();
    }
  };

  const handleState = () => {
    setGenerate('pre-generate');
  }

  return (
    <Container>
      <Header>
        <Title className="fw-bold display-5">Blog Headline</Title>
      </Header>
      <Divider/>
      <div>
        {generate === 'pending' ? (
          <Processing color='#182538' height='240px'/>
        ) : (
          <>
            <Body>
              {generate === 'pre-generate' ? (
                <InputSection ref={inputRef}>
                  <TextArea
                    ref={textAreaRef}
                    Color={(maxInput && "red") || (!minInput && "green")}
                    // rows="4"
                    placeholder="Write your text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={MAX_LENGTH}
                  />
                </InputSection>
              ) : (task === BLOG_HEADLINE && demoItems.length > 0 && (
                    <Scroll ref={scrollAreaRef}>
                      <ResultSection>
                        {demoItems.map((item, index) => (
                          <DemoItem key={index}>{item}</DemoItem>
                        ))}
                      </ResultSection>
                    </Scroll>
                  )
                )
              }
            </Body>
            <Action>
              {generate === 'pre-generate' ? (
                <LiveActionContainer>
                  <Counter>
                    {input.length}/{MAX_LENGTH}
                  </Counter>
                  <button className="btn btn-primary" onClick={handleGenerate}> Generate </button>
                </LiveActionContainer>
              ) : (task === BLOG_HEADLINE && demoItems.length > 0 && (
                    <TryAgain className="btn btn-primary" onClick={handleState}> Try Again </TryAgain>
                  )
                )
              }
            </Action>
          </>
        )
      }
    </div>
    </Container>
  );
};

export default DemoBlogHeadline;

