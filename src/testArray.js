const numbers = [10, 5, 21,30]


//create a new array using an existing
const res1 = numbers.map((number, i) => {
    return number * i;
})

console.log('res1', res1)

//perform action on each element forEach
numbers.forEach((number) => {
    console.log(`${number} ** 2 =`, number ** 2)
})

//perform action on each element for...of
for (const number of numbers) {
    console.log(`${number} ** 2 =`, number ** 2)
}

//for..of example
const data = [
    {
        a: 5,
        b: 15,
        expected: 1
    },
    {
        a: -5,
        b: 20,
        expected: 15
    }
]

for (const item of data) {
    console. log ('true', (item.a + item.b) === item.expected)
}

//returns false at the first fault
const isOdd = numbers.every(number => number % 2 === 1)
console.log('isOdd', isOdd)

//true is at least one complies with the condition
const isAnyOdd = numbers.some(number => number % 2 === 1)
console.log('isAnyOdd', isAnyOdd)

//filter elements by the condition
const onlyOddNumbers = numbers.filter(number => number % 2 === 1)
console.log('onlyOddNumbers', onlyOddNumbers)

//find the first element that complies with the condition
const result = data.find(item => {
    return item.expected === 15
})
// result is undefined if none found
console.log(result)

//checks if the array has an element of a required value
const hasTen = numbers.includes(10)
console.log('hasTen', hasTen)

const config = {
    credentials: {
        login: 'user',
        password: 'password'
    },
    baseUrl: 'https:/localhost:8080'
}
for (const property in config) {
    console.log(`${property}:`, config[property])
}