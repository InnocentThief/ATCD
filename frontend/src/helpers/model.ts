import { isObservableArray } from 'mobx'
import moment from 'moment'
import { formatMoment } from './date'

// STRING
export function parseString(value: any): string
export function parseString(
  value: any,
  optional: 'optional'
): string | undefined
export function parseString(
  value: any,
  optional?: 'optional'
): string | undefined {
  if (optional && (typeof value === 'undefined' || value === null)) {
    return value
  }
  if (typeof value === 'undefined' || value === null) {
    logTypeMissmatch('string', value)
    return ''
  }
  if (typeof value !== 'string') {
    logTypeMissmatch('string', value)
  }
  return String(value)
}

// DATE
export const parseDate = (value: any): string => {
  const parsedDate = moment(value)
  if (typeof value !== 'string' || !parsedDate.isValid()) {
    logTypeMissmatch('date', value)
    return String(value)
  }
  return formatMoment(parsedDate)
}

// NUMBER
export function parseNumber(value: any): number
export function parseNumber(
  value: any,
  optional: 'optional'
): number | undefined
export function parseNumber(
  value: any,
  optional?: 'optional'
): number | undefined {
  if (optional && (typeof value === 'undefined' || value === null)) {
    return
  }
  if (typeof value !== 'number') {
    logTypeMissmatch('number', value)
  }
  return Number(value) || 0
}

// BOOLEAN
export function parseBoolean(value: any): boolean
export function parseBoolean(
  value: any,
  optional: 'optional'
): boolean | undefined
export function parseBoolean(
  value: any,
  optional?: 'optional'
): boolean | undefined {
  if (optional && (typeof value === 'undefined' || value === null)) {
    return
  }
  if (typeof value !== 'boolean') {
    logTypeMissmatch('boolean', value)
  }
  return !!value
}

// ARRAY
export function parseArray<T>(
  value: any,
  createFunction: (p: any) => T,
  init?: T[]
): T[] {
  if (init && (typeof value === 'undefined' || value === null)) {
    return init
  }

  // mobx4 limitation
  if (isObservableArray(value)) {
    value = value.slice()
  }
  if (!Array.isArray(value)) {
    logTypeMissmatch('array', value)
    return []
  }
  return value.map(createFunction)
}

export const logTypeMissmatch = (type: string, value: any): void => {
  // tslint:disable-next-line:no-console
  console.warn(
    `DTO type missmatch. Expected "${type}", but got "${typeof value}"`,
    value
  )
}
