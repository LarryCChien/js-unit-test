/* eslint-disable class-methods-use-this */
import { Profile } from './profile'
import * as otp from './otp'

export class Authentication {
  isValid(account, password) {
    const passwordFromProfile = this.getPassword(account)

    // const otp = new Otp();
    const token = otp.getToken()
    // console.log(`password:${passwordFromProfile}, token:${token}`)

    const validPassword = passwordFromProfile + token
    if (validPassword === password) {
      return true
    }
    return false
  }

  getPassword(account) {
    const profile = new Profile()
    return profile.getPassword(account)
  }
}
