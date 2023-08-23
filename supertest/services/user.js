import supertest from 'supertest';
import config from "../config/config";

const {url} = config
let token = ''

//user controller
const user = {
    //authorization
    login:(payload) => {
        return supertest(url)
        .post('Account/v1/Authorized')
        .set('Accept', 'application/json')
        .send(payload)
    },
    //get token
    async getAuthToken () {
        const payload = config.credentials
        const res = await this.login(payload)
        return res.body.token
    },
    //create a user
    async getUserID () {
        const token = await this.getAuthToken()
        const payload = config.newUser
        return supertest(url)
        .post('Account/v1/User')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        return res.userID
    },
    //delete a user
    async userDelete () {
        const token = await this.getAuthToken()
        const user = config.newUser
        const userID = await this.getUserID(user)
        return supertest(url)
        .delete('Account/v1/User/'+`${userID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    },
    //get user info
    async getUserInfo () {
      const token = await this.getAuthToken()
      const user = config.newUser
      const userID = await this.getUserID(user)
      return supertest(url)
      .get('Account/v1/User/'+`${userID}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
  }
}

export default user