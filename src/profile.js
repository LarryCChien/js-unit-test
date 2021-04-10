/* eslint-disable class-methods-use-this */
export class Profile {
  getPassword(account) {
    const profiles = {
      joey: '91',
      mei: '99',
    }
    return profiles[account]
  }
}
