import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

const useUAParser = () => {
  const [UA, setUA] = useState({ success: false, parser: {} });

  useEffect(() => {
    const parser = new UAParser();
    setUA({ success: true, parser: parser.getResult() });
  }, []);

  return UA;
};

export default useUAParser;
