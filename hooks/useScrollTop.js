import { useEffect } from "react";
import { useRouter } from "next/router";

const useScrollTop = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default useScrollTop;
