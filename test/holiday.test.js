import { beforeEach, expect, jest } from '@jest/globals'
import { /* getToday, */ holidayFunction, HolidayClass } from '../src/holiday'

describe('Merry Christmas 的判斷函式 with function', () => {
  let tempGivenDate
  let givenToday
  let sayHelloShouldBe

  beforeEach(() => {
    tempGivenDate = undefined

    givenToday = (month, day) => {
      tempGivenDate = new Date(2000, month, day)
      return new Date(2000, month, day)
    }

    sayHelloShouldBe = (expected) => {
      expect(holidayFunction(tempGivenDate)).toBe(expected)
    }
  })

  it('今天是聖誕節', () => {
    givenToday(11, 25)
    sayHelloShouldBe('Merry Xmas')
  })

  it('今天是聖誕節當今天是 12/24 (*因應需求異動)', () => {
    givenToday(11, 24)
    sayHelloShouldBe('Merry Xmas')
  })

  it('今天不是聖誕節', () => {
    givenToday(11, 26)
    sayHelloShouldBe('Today is not Xmas')
  })

  it('今天不是聖誕節當今天是 11/24 (*因應需求異動)', () => {
    givenToday(10, 24)
    sayHelloShouldBe('Today is not Xmas')
  })

  it('今天是聖誕節 with jest.spyOn', () => {
    const mockDate = new Date('12/25')
    let spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(holidayFunction()).toBe('Merry Xmas')
    spy.mockRestore()
  })

  it('今天不是聖誕節 with jest.spyOn', () => {
    const mockDate = new Date('12/26')
    let spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(holidayFunction()).toBe('Today is not Xmas')
    spy.mockRestore()
  })
})

// 找到依賴，隔絕依賴
describe('Merry Christmas 的判斷函式 with class', () => {
  let testHoliday
  let givenToday
  let sayHelloShouldBe

  beforeEach(() => {
    testHoliday = new HolidayClass()

    givenToday = (month, day) => {
      testHoliday.getToday = () => {
        return new Date(2000, month, day)
      }
    }

    sayHelloShouldBe = (expected) => {
      expect(testHoliday.sayHello()).toBe(expected)
    }
  })

  it('今天是聖誕節', () => {
    givenToday(11, 25)
    sayHelloShouldBe('Merry Xmas')
  })

  it('今天是聖誕節當今天是 12/24 (*因應需求異動)', () => {
    givenToday(11, 24)
    sayHelloShouldBe('Merry Xmas')
  })

  it('今天不是聖誕節', () => {
    givenToday(11, 26)
    sayHelloShouldBe('Today is not Xmas')
  })

  it('今天不是聖誕節當今天是 11/24 (*因應需求異動)', () => {
    givenToday(10, 24)
    sayHelloShouldBe('Today is not Xmas')
  })
})
