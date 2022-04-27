const quillFormat = (quill, { index, length }) => {
  quill.formatText(index, length, {
    bold: true,
    color: "purple",
  });
};

const quillPlagiarism = (
  quill,
  data = [],
  position = { index: 0, length: 0 }
) => {
  const dataLength = data?.length;

  if (quill && Array.isArray(data) && dataLength) {
    for (let i = 0; i < dataLength; i++) {
      const item = data[i];
      if (item.ranges.length) {
        const [index, length] = item.ranges[0];
        quillFormat(quill, { index, length });
      } else {
        const { index, length } = position;
        quillFormat(quill, { index, length });
        break;
      }
    }
  }
};

export default quillPlagiarism;
