import { createSelector } from "@reduxjs/toolkit";

const globalSelectors = {
  getPersist: createSelector(
    (state) => state?._persist,
    (persist) => {
      return persist?.rehydrated ? true : false;
    }
  ),
};

export default globalSelectors;
