import { useState, useEffect } from "react";

import { useWindowSize } from "hooks";

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: undefined,
    isDesktop: undefined,
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    setScreenSize({
      ...screenSize,
      isMobile: windowSize?.width < 768,
      isDesktop: windowSize?.width >= 768,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return screenSize;
};

export default useResponsive;
