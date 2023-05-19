import moment from 'moment'

export const formatMoment = (date: moment.Moment): string => date.format('l')

export const formatDate = (date: string | Date): string =>
  formatMoment(moment(date))
