import { beforeEach, jest } from '@jest/globals'
import { Authentication } from '../src/authentication'
import * as otp from '../src/otp'

jest.mock('../src/otp')

describe('authenticate account is valid', () => {
  let authentication = new Authentication()
  let fakeGetPassword
  // let fakeGetToken
  let givenPassword
  let givenToken
  beforeEach(() => {
    fakeGetPassword = jest.fn()
    authentication.getPassword = fakeGetPassword

    givenPassword = (password) => {
      fakeGetPassword.mockReturnValueOnce(password)
    }

    givenToken = (token) => {
      otp.getToken.mockReturnValueOnce(token)
    }
  })

  const shouldBeValid = (password) => {
    expect(authentication.isValid('joey', password)).toBe(true)
  }

  it('should be valid', () => {
    givenPassword('91')
    givenToken('000000')
    shouldBeValid('91000000')
  })

  const shouldBeInvalid = (password) => {
    expect(authentication.isValid('joey', password)).toBe(false)
  }

  it('should be invalid', () => {
    givenPassword('91')
    givenToken('000000')
    shouldBeInvalid('wrong password')
  })
})
