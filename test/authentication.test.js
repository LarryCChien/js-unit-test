import { jest } from '@jest/globals'
import { Authentication } from '../src/authentication'
import * as otp from '../src/otp'

jest.mock('../src/otp')

describe('authenticate account is valid', () => {
  it('should be valid', () => {
    let authentication = new Authentication()

    const fakeGetPassword = jest.fn()
    authentication.getPassword = fakeGetPassword
    fakeGetPassword.mockReturnValueOnce('91')

    otp.getToken.mockReturnValueOnce('000000')

    expect(authentication.isValid('joey', '91000000')).toBe(true)
  })
})
