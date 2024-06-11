import deepEqual from "deep-equal";
import { useEffect, useRef } from "react";

const deepCompareEquals = (a, b) => {
  return deepEqual(a, b);
};

const useDeepCompareMemoize = (value) => {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }
};

const useDeepCompareEffect = (callback, dependencies) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

export default useDeepCompareEffect;
