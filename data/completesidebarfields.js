const completeSidebarData = (task) => {
  const schema = {};
  return schema[task] ? schema[task] : {};
};

export default completeSidebarData;
