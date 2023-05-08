import moment from "moment";

export const formatMoment = (date: moment.Moment): string =>
  date.format("YYYY-MM-DDTHH:mm:ss");

export const formatDate = (date: string | Date): string =>
  formatMoment(moment(date));
