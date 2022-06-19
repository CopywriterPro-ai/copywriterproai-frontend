import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  selectors as uiSelector,
  setSubscriptionsTrailEndModal,
} from "@/redux/slices/ui";
import {
  selectors as paymentSelector,
  postTrialEndInstantly,
} from "@/redux/slices/payment";
import { useUser } from "@/hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 9999 },
};

const TrailEndModal = () => {
  const dispatch = useDispatch();

  const { subscribe } = useUser();
  const {
    subscriptions: { trailEnd },
  } = useSelector(uiSelector.getModal);
  const trialSelector = useSelector(paymentSelector.getTrail);

  const handleCloseModal = () => {
    dispatch(setSubscriptionsTrailEndModal(false));
  };

  const isTrail = subscribe.freeTrial.eligible;

  const isPending = trialSelector.loading === "pending";

  const handleTrialEnd = () => {
    isTrail &&
      !isPending &&
      dispatch(postTrialEndInstantly()).finally(() => {
        dispatch(setSubscriptionsTrailEndModal(false));
      });
  };

  return (
    <Modal
      isOpen={trailEnd}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Subscriptions Trial End Modal"
    >
      <StyledContainer>
        <StyledModalContent>
          <h3>Are you sure you want to cancel your trial?</h3>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            vitae sunt consequatur.
          </p> */}
        </StyledModalContent>
        <StyledModalControl>
          <button onClick={handleCloseModal}>Go Back</button>
          <button onClick={handleTrialEnd}>
            {isPending ? "Loading..." : "End Trial"}
          </button>
        </StyledModalControl>
      </StyledContainer>
    </Modal>
  );
};

const StyledContainer = styled.div`
  max-height: 80vh;
  max-width: 500px;
`;

const StyledModalContent = styled.div`
  text-align: center;
`;

const StyledModalControl = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    background-color: white;
    border: 1.5px solid #3a4841;
    padding: 3px 10px;
    border-radius: 3px;
    font-size: 15px;
    line-height: 22px;
    user-select: none;
    margin: 15px 0 15px 0;
  }
`;

export default TrailEndModal;
