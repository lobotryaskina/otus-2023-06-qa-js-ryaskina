import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

async function getToken() {
  const URL = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: "vsevsbore",
      password: "121FDsvdfB!RFEF_"
    })
  })
  const data = await response.json();
  const token = data.token;
  console.log(data.token);
  expect(response.status).toBe(200)
  return token;
}

test('Create existing user', async () => {
  const token = await getToken();
  const URL = 'https://bookstore.demoqa.com/Account/v1/User';
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: "vsevsbore",
      password: "121FDsvdfB!RFEF_"
    })
  })
  const data = await response.json();
  console.log(data);
  expect(response.status).toBe(406)
  expect(data.message).toContain("User exists!")
})

test('Wrong password', async () => {
  const token = await getToken();
  const URL = 'https://bookstore.demoqa.com/Account/v1/User';
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: "goodLittleUser",
      password: "12345"
    })
  })
  const data = await response.json();
  console.log(data);
  expect(response.status).toBe(400)
  expect(data.code).toContain("1300")
})

test.skip('Successful user create', async () => {
  const token = await getToken();
  const URL = 'https://bookstore.demoqa.com/Account/v1/User';
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: "greatLittleUser",
      password: "12!_EGxs!11!30gh45"
    })
  })
  const data = await response.json();
  console.log(data);
  expect(response.status).toBe(201)
  expect(data.userID).not.toBeNull
})

test('Generate token error', async () => {
  const URL = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: "vsevsbore",
      password: "wrongPassword"
    })
  })
  const data = await response.json();
  const Token = data.token;
  console.log(data.token);
  expect(response.status).toBe(200);
  expect(data.status).toBe("Failed");
})

test('Generate token success', async () => {
  const URL = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: "greatLittleUser",
      password: "12!_EGxs!11!30gh45"
    })
  })
  const data = await response.json();
  const Token = data.token;
  console.log(data.token);
  expect(response.status).toBe(200)
  expect(data.status).toBe("Success")
})