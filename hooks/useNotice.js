import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNotice, selectors as uiSelector } from "@/redux/slices/ui";

const useNotice = () => {
  const dispatch = useDispatch();
  const { isLoaded, data, loading, error } = useSelector(uiSelector.getNotice);

  useEffect(() => {
    if (!isLoaded) dispatch(getNotice());
  }, [dispatch, isLoaded]);

  return { data, loading, error };
};

export default useNotice;
