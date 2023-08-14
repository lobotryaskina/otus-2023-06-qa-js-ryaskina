import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Проверка функции nameIsValid
 */
describe('nameIsValid function unit tests', () => {
  test('returns true when given a real name', () => {
    expect(nameIsValid('Irma')).toBeTruthy();
  })
  test('returns false when given a single character', () => {
    expect(nameIsValid('I')).toBeFalsy();
  })
  test('returns false when given a number', () => {
    expect(nameIsValid(470987)).toBeFalsy();
  })
})

/**
 * Проверка функции fullTrim
 */
describe('fullTrim function unit tests', () => {
  test('removes spaces from the beginning', () => {
    expect(fullTrim('    Irma')).toEqual('Irma');
  })
  test('removes spaces from the end', () => {
    expect(fullTrim('Irma     ')).toEqual('Irma');
  })
  test('removes spaces from the beginning, middle, end', () => {
    expect(fullTrim('      Ir     ma      ')).toEqual('Irma');
  })
})

/**
 * Проверка функции getTotal
 */
describe('getTotal function throws errors', () => {
  test('discount is not a number', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], '10')).toThrow(Error);
  })
  test('discount is negative', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -10)).toThrow(Error);
  })
})

/**
 * Параметризированная проверка функции getTotal
 */
describe('getTotal function parametric test', () => {
  test.each`
  price | quantity | discount | expected
  ${10} | ${10}    | ${0}     | ${100}
  ${50} | ${10}    | ${10}    | ${450}
  ${10} | ${10}    | ${100}   | ${0}
  ${10} | ${10}    | ${-50}   | ${'error'}
  ${10} | ${10}    | ${'#'}   | ${'error'}
`('$price $quantity $discount = $expected', ({ price, quantity, discount, expected }) => {
  if (expected === 'error') {
    expect(() => getTotal(price, quantity, discount)).toThrow();
  } else {
    expect(getTotal([{ price, quantity }], discount)).toBe(expected);
  }
});
})