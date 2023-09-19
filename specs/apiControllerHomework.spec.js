import { expect, test } from '@jest/globals'
import config from "../framework/config/config";
import user from '../framework/services/userService';
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'
import supertest from 'supertest';

describe('POST Account/v1/Authorized', () => {
  test('successful user authorization', async () => {
    const res = await user.login(config.credentials)
    expect(res.status).toEqual(200);
  }),
  test('user authorization error', async () => {
    const res = await user.login({userName: 'vsevsbore', password: '12345'})
    expect(res.status).toEqual(404);
  })
})

describe('POST Account/v1/GenerateToken', () => {
  test('get token', async () => {
    const res = await user.getAuthToken(config.credentials)
    expect(res.status).toEqual(200);
  })
})

describe('POST Account/v1/User', () => {
  test('getUserID', async () => {
    const res = await user.userCreate(config.newUser)
    expect(res.status).toEqual(201);
    expect(res.body.userID).not.toBeNull();
  })
})

describe('DELETE Account/v1/User/{UUID}', () => {
  test('successful user deletion', async () => {
    const res = await user.userDelete(config.newUser);
    expect(res.status).toEqual(200);
  })
})

describe('GET Account/v1/User/{UUID}', () => {
  test('get user information', async () => {
    const res = await user.getUserInfo(config.newUser);
    expect(res.status).toEqual(200);
    expect(res.username).not.toBeNull();
  })
})