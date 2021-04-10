/* eslint-disable class-methods-use-this */
import { BookDao } from './book_dao'

export class OrderService {
  syncBookOrders() {
    let orders = this.getOrders()
    // console.log(orders)

    orders.filter((order) => {
      return order.orderType === 'Book'
    }).forEach((order) => {
      this.bookInsert(order)
    })
  }

  bookInsert(order) {
    let bookDao = new BookDao()
    bookDao.insert(order)
  }

  // 基本上這個 method 是跑不動的，因為此次重點是練習測試
  getOrders() {
    const parse = require('csv-parse')
    const fs = require('fs')
    const fsPromises = fs.promises
    const path = require('path')

    const inputFilePath = path.resolve(__dirname, './orders.csv')

    return main()

    async function main() {
      const inputFile = await fsPromises.readFile(inputFilePath)
      const parsedResult = await parseCSV(inputFile, {
        delimiter: ',',
        columns: true,
      })

      console.log('parsedResult', parsedResult)
      return parsedResult
    }

    function parseCSV(input, options) {
      return new Promise((resolve, reject) => {
        parse(input, options, (error, output) => {
          if (error) {
            console.error('[ERROR] parseCSV: ', error.message)
            reject('[ERROR] parseCSV: ', error.message)
          }

          resolve(output)
        })
      })
    }
  }
}
