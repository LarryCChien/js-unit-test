import { expect, jest } from '@jest/globals'
import { /* getToday, */ holidayFunction, HolidayClass } from '../src/holiday'

describe('Merry Christmas 的判斷函式 with function', () => {
  xit('12/25 當天未傳入日期時，回傳 "Merry Xmas"', () => {
    // getToday = () => {
    //   return new Date('12/25')
    // }

    expect(holidayFunction()).toBe('Merry Xmas')
  })

  it('12/25 當天未傳入日期時，回傳 "Merry Xmas" with jest.spyOn', () => {
    const mockDate = new Date('12/25')
    let spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(holidayFunction()).toBe('Merry Xmas')
    spy.mockRestore()
  })

  it('12/25 當天有傳入日期時，回傳 "Merry Xmas"', () => {
    const mockDate = new Date('12/25')

    expect(holidayFunction(mockDate)).toBe('Merry Xmas')
  })

  it('非 12/25 當天未傳入日期時，回傳 "Today is not Xmas" with jest.spyOn', () => {
    const mockDate = new Date('12/26')
    let spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(holidayFunction()).toBe('Today is not Xmas')
    spy.mockRestore()
  })

  it('非 12/25 當天有傳入日期時，回傳 "Today is not Xmas"', () => {
    const mockDate = new Date('12/26')

    expect(holidayFunction(mockDate)).toBe('Today is not Xmas')
  })
})

// 找到依賴，隔絕依賴
describe('Merry Christmas 的判斷函式 with class', () => {
  it('12/25 當天，回傳 "Merry Xmas"', () => {
    const testHoliday = new HolidayClass()
    testHoliday.getToday = () => {
      return new Date('2020/12/25')
    }

    expect(testHoliday.sayHello()).toBe('Merry Xmas')
  })

  it('非 12/25 時，回傳 "Today is not Xmas"', () => {
    const testHoliday = new HolidayClass()
    testHoliday.getToday = () => {
      return new Date('2020/12/26')
    }

    expect(testHoliday.sayHello()).toBe('Today is not Xmas')
  })
})
