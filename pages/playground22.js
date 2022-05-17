import React, { useTransition, useState } from "react";

// import * as mixUtils from "@/utils/mixUtils";

function Playground() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  return (
    <div>
      {isPending && <h3>Loading...</h3>}
      <button onClick={handleClick}>Counter: {count}</button>
    </div>
  );
}
export default Playground;
