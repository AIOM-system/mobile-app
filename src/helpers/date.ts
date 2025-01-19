import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

export const convertToUTC = (date: Date) => {
  return dayjs.utc(date);
}

export const getDate = (date: Date | string) => {
  return dayjs(date);
}