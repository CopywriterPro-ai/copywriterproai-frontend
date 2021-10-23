/* eslint-disable react/display-name */
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import("react-quill");
    return ({ forwardedRef, ...props }) => (
      <Quill ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
    loading: () => <p>Loading Editor...</p>,
  }
);

export default ReactQuill;
