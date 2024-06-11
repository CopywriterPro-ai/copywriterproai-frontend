import { useEffect } from "react";
import { useRouter } from "next/router";
import { isServer } from "@/utils";

const useScrollTop = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      !isServer &&
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [asPath]);

  return null;
};

export default useScrollTop;
