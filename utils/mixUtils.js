import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// dayjs.extend(utc);
dayjs.extend(timezone);

export function getTimezone() {
  return dayjs.tz.guess();
}
