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
          <h3>Trail End!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            vitae sunt consequatur.
          </p>
        </StyledModalContent>
        <StyledModalControl>
          <button className="cancel" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="trail-end" onClick={handleTrialEnd}>
            {isPending ? "Loading..." : "Trail End"}
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
    border: 0;
    border-radius: 5px;
    padding: 4px 10px;
  }

  .cancel {
    background-color: green;
    color: white;
  }
  .trail-end {
    background-color: red;
    color: white;
  }
`;

export default TrailEndModal;
