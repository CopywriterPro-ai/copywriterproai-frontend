import { useEffect, useState } from "react";

const useTypeWriter = ({ text = "", speed = 100 }) => {
  const [typing, setTyping] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length > index) {
        let char = text.charAt(index);
        setTyping(typing + "" + char);
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return typing;
};

export default useTypeWriter;
