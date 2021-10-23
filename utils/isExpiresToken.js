import dayjs from "dayjs";

const SUBTRACT_SECOND = 5;
const CURRENT_TIME = dayjs();

const isExpireToken = (expires = CURRENT_TIME) => {
  if (expires === null) return true;
  const expiresTime = dayjs(expires).subtract(SUBTRACT_SECOND, "s");
  const boolean = dayjs().isAfter(dayjs(expiresTime));
  return boolean;
};

export default isExpireToken;
