import { useState, useEffect } from "react";

const useNodeSize = (Ref, defaultSize = null) => {
  const [height, setHeight] = useState(defaultSize);

  useEffect(() => {
    let cancelled = false;
    const getHeight = () => {
      const { current } = Ref;
      if (!current || !current.clientHeight) {
        if (!cancelled) {
          requestAnimationFrame(getHeight);
        }
      } else {
        setHeight(current.clientHeight);
      }
    };
    getHeight();

    return () => {
      cancelled = true;
    };
  }, [Ref]);

  return height;
};

export default useNodeSize;
