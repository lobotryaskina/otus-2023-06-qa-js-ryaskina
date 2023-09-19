import supertest from 'supertest';
import config from "../config/config";

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
    async getAuthToken(payload) {
        const res = await supertest(url)
        .post('Account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send(payload)
        return (res.body.token)
    },
    //get user ID
    async userCreate(payload) {
        const res = await supertest(url)
        .post('Account/v1/User')
        .set('Accept', 'application/json')
        .send(payload)
        return (res.body.userID)
    },
    //delete a user
    userDelete: (payload) => {
        token = this.getAuthToken(payload)
        userID = this.userCreate(payload)
        return supertest(url)
        .delete('Account/v1/User/'+`${userID}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    },
    //get user info
   getUserInfo: (payload) => {
      token = this.getAuthToken(payload)
      userID = this.userCreate(payload)
      return supertest(url)
      .get('Account/v1/User/'+`${userID}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    }
}

export default user