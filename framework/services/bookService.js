import supertest from 'supertest';
import config from "../config/config";
import user from './userService';

const {url} = config
let token = ''
let userID = ''

//book controller
const book = {
    //list of books
    getBooks:(token) => {
        return supertest(url)
        .get('BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        return res.body.books
    },
    //get books list
    async getBooks(token) {
        const res = await supertest(url)
        .get('BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        return res.body.books
    },
    //get first ISBN
    async getIsbn(token) {
        const res = await supertest(url)
        .get('BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        return res.body.books[0].isbn
    },
    //post a book
    bookPost:(token, userID, isbn) => {
        return supertest(url)
        .post('BookStore/v1/Books')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "userId": `${userID}`,
            "collectionOfIsbns": [
              {
                "isbn": `${isbn}`
              }
            ]
          })
    },
    //replace a book
    bookPut:(token, userID, isbn, value) => {
        return supertest(url)
        .put('BookStore/v1/Books/'+`${isbn}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "userId": `${userID}`,
            "isbn": `${value}`
          })
    },
    //get book info
    bookInfo:(token, isbn) => {
        return supertest(url)
        .get('BookStore/v1/Book?ISBN='+`${isbn}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    },
    //delete a book
    bookDelete: (token, userID, isbn) => {
        return supertest(url)
        .delete('BookStore/v1/Book')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "isbn": `${isbn}`,
            "userId": `${userID}`
          })
    }
}

export default book