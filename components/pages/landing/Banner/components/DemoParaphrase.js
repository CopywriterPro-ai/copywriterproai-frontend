import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  postLandingDemo,
  selectors as demoGenerateSelector,
} from "@/redux/slices/demoGenerate";
import { useElementSize } from "@/hooks";
import {
  Container,
  Scroll,
  InputSection,
  Title,
  TextArea,
  LiveActionContainer,
  Counter,
  Button,
  ResultSection,
  DemoItem,
} from "./style";
import Loader from "@/components/common/Loader";
import { PARAPHRASING } from "@/appconstants";

const MAX_LENGTH = 100;
const MIN_LENGTH = 10;

const DemoParaphrase = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const textAreaRef = useRef(null);

  const { height: inputHeigth } = useElementSize(inputRef);

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
      dispatch(
        postLandingDemo({
          data: {
            task: PARAPHRASING,
            userText: input,
          },
        })
      ).then(({ payload }) => {
        if (payload.status === 200) {
          scrollAreaRef.current.scroll({
            top: inputHeigth,
            left: 0,
            behavior: "smooth",
          });
        }
      });
    } else {
      textAreaRef.current.focus();
    }
  };

  return (
    <Container>
      <Title>Paraphrase</Title>
      <Scroll ref={scrollAreaRef}>
        <InputSection ref={inputRef}>
          <TextArea
            ref={textAreaRef}
            Color={(maxInput && "red") || (!minInput && "green")}
            rows="8"
            placeholder="Write your text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_LENGTH}
          ></TextArea>
          <LiveActionContainer>
            <Counter>
              {input.length}/{MAX_LENGTH}
            </Counter>
            <Button onClick={handleGenerate}>
              {isPending ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  Generating{" "}
                  <Loader style={{ marginLeft: "5px" }} size="10px" />
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </LiveActionContainer>
        </InputSection>

        {task === PARAPHRASING && demoItems.length > 0 && (
          <ResultSection>
            {demoItems.map((item, index) => (
              <DemoItem key={index}>{item}</DemoItem>
            ))}
          </ResultSection>
        )}
      </Scroll>
    </Container>
  );
};

export default DemoParaphrase;
