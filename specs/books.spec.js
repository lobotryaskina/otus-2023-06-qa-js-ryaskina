import { expect, test } from '@jest/globals'
import config from "../framework/config/config";
import user from '../framework/services/userService';
import book from '../framework/services/bookService';
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'
import supertest from 'supertest';
import each from 'jest-each';

//Создание книги в аккаунт юзера
describe('POST Bookstore/v1/Books', () => {
  test('post a book', async () => {
    const userID = config.userID
    const token = config.token
    const isbn = (await book.getBooks(token))[0].isbn
    const res = await book.bookPost(token, userID, isbn)
    expect(res.status).toEqual(201);
    expect(res.body.isbn).not.toBeNull;
  })
})

//Обновление книги в аккаунте юзера
describe('PUT Bookstore/v1/Books/{ISBN}', () => {
  test('replace a book', async () => {
    const userID = config.userID
    const token = config.token
    const isbn = (await book.getBooks(token))[0].isbn
    const value = (await book.getBooks(token))[1].isbn
    const res = await book.bookPut(token, userID, isbn, value)
    expect(res.status).toEqual(200);
    expect(res.body.books).toBe(`${userID}`);
    expect(res.body.books).not.toBeNull;
  })
})

//Удаление книги
describe('GET Bookstore/v1/Book/{ISBN}', () => {
  test('delete a book', async () => {
    const token = config.token
    const userID = config.userID
    const isbn = (await book.getBooks(token))[0].isbn
    const res = await book.bookDelete(token, isbn)
    expect(res.status).toEqual(204);
  })
})

//Получение информации о книге
describe('GET Bookstore/v1/Book/?ISBN=', () => {
  test('get book info', async () => {
    const token = config.token
    const isbn = (await book.getBooks(token))[0].isbn
    const res = await book.bookInfo(token, isbn)
    expect(res.status).toEqual(200);
  })
})

//Получение информации о книге, параметризировано: 
const cases = [[0, config.token, 200, "Git Pocket Guide"],
               [1, config.token, 200, "Learning JavaScript Design Patterns"],
               //isbn не найден
               ["", config.token, 400],
               //unauthorized
               [2, " ", 401]];

describe('get book info parameterised test', () => {
  test.concurrent.each(cases)('get book info', async (number, token, status, title) => {
  let isbn = '12345'
  if (number !== "") {
    isbn = (await book.getBooks(token))[`${number}`].isbn
  }
  const res = await book.bookInfo(token, isbn);
  expect(res.status).toEqual(status);
  expect(res.body.title).toEqual(title)
});
});




