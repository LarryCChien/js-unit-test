import { beforeEach, expect, jest } from '@jest/globals'
import { Authentication } from '../src/authentication'
import * as otp from '../src/otp'

jest.mock('../src/otp')

describe('authenticate account is valid', () => {
  let authentication = new Authentication()
  let fakeGetPassword
  // let fakeGetToken
  let fakeNotify
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

    fakeNotify = jest.fn()
    authentication.notifyUser = fakeNotify
  })

  const shouldBeValid = (password) => {
    expect(authentication.isValid('joey', password)).toBe(true)
  }

  it('should be valid', () => {
    givenPassword('91')
    givenToken('000000')
    shouldBeValid('91000000')
  })

  const shouldNotNotify = (password) => {
    authentication.isValid('joey', password)
    expect(fakeNotify).toBeCalledTimes(0)
  }

  it('should be valid', () => {
    givenPassword('91')
    givenToken('000000')
    shouldNotNotify('91000000')
  })

  const shouldBeInvalid = (password) => {
    expect(authentication.isValid('joey', password)).toBe(false)
  }

  it('should be invalid', () => {
    givenPassword('91')
    givenToken('000000')
    shouldBeInvalid('wrong password')
  })

  const whenInvalid = (password) => {
    givenPassword('91')
    givenToken('000000')
    authentication.isValid('joey', password)
  }

  const shouldSendNotification = (password, status) => {
    expect(fakeNotify).toBeCalledTimes(1)
    expect(fakeNotify.mock.calls[0][0]).toEqual(
      expect.stringContaining(status),
    )
  }

  it('should notify user when invalid', () => {
    whenInvalid('wrong password')
    shouldSendNotification('wrong password', 'login failed')
  })
})
