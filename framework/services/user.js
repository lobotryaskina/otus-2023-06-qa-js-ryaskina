import supertest from 'supertest';
import config from "../../framework/config/config";

const {url} = config
let token = ''
let userID = ''

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
    getAuthToken: (payload) => {
        return supertest(url)
        .post('Account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send(payload)
        return res.body.token
    },
    //get user ID
    userCreate: (payload) => {
        return supertest(url)
        .post('Account/v1/User')
        .set('Accept', 'application/json')
        .send(payload)
        return res.body.userID
    },
    //delete a user
    async userDelete () {
        const payload = config.newUser
        token = this.getAuthToken(payload)
        userID = this.userCreate(payload)
        return supertest(url)
        .delete('Account/v1/User/'+`${userID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    },
    //get user info
   async getUserInfo () {
      const payload = config.newUser
      token = this.getAuthToken(payload)
      userID = this.userCreate(payload)
      return supertest(url)
      .get('Account/v1/User/'+`${userID}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    }
}

export default user