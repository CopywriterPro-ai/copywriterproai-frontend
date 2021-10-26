import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";

// {
//   ops: [
//     { insert: 'Gandalf', attributes: { bold: true } },
//     { insert: ' the ' },
//     { insert: 'Grey', attributes: { color: '#cccccc' } }
//   ]
// }

import { SpecialLayout as Layout } from "@/layout";

const Playground = () => {
  const [deltaValue, setDeltaValue] = useState([]);
  const { quill, quillRef } = useQuill({
    placeholder: "Start writing here...",
    theme: "snow",
  });

  useEffect(() => {
    if (quill) {
      quill.on("selection-change", function (range, oldRange, source) {
        if (range) {
          if (range.length == 0) {
            console.log("User cursor is on", range.index);
          } else {
            var text = quill.getText(range.index, range.length);
            console.log("User has highlighted", text);
          }
        } else {
          console.log("Cursor not in the editor");
        }
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      // quill
      //   .getModule("toolbar")
      //   .addHandler("image", () => selectLocalImage(quill));
      quill.setContents(deltaValue);
      // quill.on("text-change", (delta, oldDelta, source) => {
      //   console.log(quill.getContents());
      //   setQuillValue(quill.getContents());
      // });
    }
  }, [deltaValue, quill]);

  // useEffect(() => {
  //   if (quill) {
  //     console.log(quill.getSelection());
  //   }
  // }, [quill]);

  return (
    <Layout>
      <button
        onClick={() =>
          setDeltaValue([
            { insert: "Gandalf", attributes: { bold: true } },
            { insert: " the " },
            { insert: "Grey", attributes: { color: "#cccccc" } },
          ])
        }
      >
        setDelta
      </button>
      <h1>Playground</h1>
      <div className="editor-container">
        <div ref={quillRef} />
      </div>
    </Layout>
  );
};

export default Playground;
