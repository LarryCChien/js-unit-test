import { expect } from '@jest/globals'
import { OrderService } from '../src/order_service'

describe('sync book orders', () => {
  let orderService
  let fakeOrders
  let fakeInsert
  beforeEach(() => {
    fakeOrders = jest.fn()
    fakeInsert = jest.fn()
    orderService = new OrderService()

    orderService.bookInsert = fakeInsert
  })

  const givenOrders = () => {
    orderService.getOrders = fakeOrders.mockReturnValueOnce([
      { orderType: 'Book', price: 100 },
      { orderType: 'Fruit', price: 250 },
      { orderType: 'Book', price: 150 },
    ])
  }
  const shouldInsertBookOrder = (number) => {
    orderService.syncBookOrders()
    expect(fakeInsert).toBeCalledTimes(number)
    expect(fakeInsert.mock.calls[0][0]).toEqual({ orderType: 'Book', price: 100 })
    expect(fakeInsert.mock.calls[1][0]).toEqual({ orderType: 'Book', price: 150 })
  }

  it('should only sync book orders', () => {
    givenOrders()
    shouldInsertBookOrder(2)
  })
})
