const getToday = () => {
  return new Date()
}

const holidayFunction = (date = getToday()) => {
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate() + 1

  if (month === 12 && (day === 25 || day === 24)) {
    return 'Merry Xmas'
  }
  return 'Today is not Xmas'
}

class Holiday {
  sayHello() {
    // const date = new Date()
    const date = this.getToday()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate() + 1

    if (month === 12 && (day === 25 || day === 24)) {
      return 'Merry Xmas'
    }
    return 'Today is not Xmas'
  }

  // eslint-disable-next-line class-methods-use-this
  getToday() {
    return new Date()
  }
}

export { getToday, holidayFunction as holidayFunction, Holiday as HolidayClass }
