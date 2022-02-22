const blacklist = [
  "content",
  "persist/PERSIST",
  "persist/PURGE",
  "blog",
  "completeBlog",
];

const predicate = (action) => {
  let allowed = true;

  const isBlacklist =
    blacklist.findIndex((item) => action.type.startsWith(item)) >= 0;

  if (isBlacklist) {
    allowed = false;
  } else {
    allowed = true;
  }

  return allowed;
};

export default predicate;
