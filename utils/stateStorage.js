import isServer from "@/utils/isServer";

const loadState = () => {
  try {
    if (isServer) return undefined;

    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    if (isServer) return;

    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    console.warn("failed to save state");
  }
};

const stateStorage = { loadState, saveState };

export default stateStorage;
