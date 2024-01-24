import { v4 as uuidv4 } from 'uuid'
import { generate } from 'generate-password'
import { DateTime } from 'luxon'
import moment from 'moment'

export function GENERATE_UUID(): string {
  return uuidv4()
}

export function GENERATE_PASSWORD(length: number): string {
  return generate({ length, uppercase: true, lowercase: true })
}

export function DESIGNATION_ID(init: string): string {
  const today = new Date()
  const prt1 = `${today.getDay()}${today.getMonth()}${today.getFullYear()}`
  const prt2 = `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`
  return `${init}-${prt1}${prt2}`
}

export function GENETRATE_NUMBER(length: number): number {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  )
}

export function GENERATE_MINUTES(date: DateTime): number {
  const dateRefactored = moment(`${date}`)
  return moment().diff(dateRefactored, 'minutes')
}

export function GENERATE_TIME(date: DateTime, type: 'hours' | 'minutes' | 'seconds'): number {
  const dateRefactored = moment(`${date}`)
  return moment().diff(dateRefactored, type)
}

export function UNIQUE_DESIGNATION_ID(
  type: string,
  codeEnterprise: string,
  dataLength: number
): string {
  const today = new Date()
  const count = dataLength + 1

  // custom day (2 digits)
  const date: string =
    today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate().toString()}`

  // custom month (2 digits)
  const month: string =
    today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`

  // custom year (2 digits)
  const year = `${today.getFullYear()}`.substring(2, 4)

  const prt1 = `${date}${month}${year}`
  const lastPart: string =
    count < 10 && count > 0
      ? `000${count}`
      : count < 100
        ? `00${count}`
        : count < 1000
          ? `0${count}`
          : `${count}`

  return `${type}/${codeEnterprise}/${prt1}/${lastPart}`
}
