import axios from 'axios';
import {
    BOOK_ADD,
    BOOK_CLEAR,
    BOOK_GET,
    BOOK_UPDATE,
    BOOKS_GET_ALL
} from '../types';

export function addBook(book) {
    const request = axios.post('/api/books/book', book)
    .then( response => response.data)

    return {
        type: BOOK_ADD,
        payload: request
    }
}

export function clearBook(book) {
    return {
        type: BOOK_CLEAR,
        payload: null
    }
}
// EDIT / GET BOOK
export function getBook(bookId) {
    const request = axios.get(`/api/books/book?id=${bookId}`)
    .then( response => {
        return response.data
    }).catch((err)=> {
        return false;  // err
    } )

    return {
        type: BOOK_GET,
        payload: request
    }
}

// UPDATE / PATCH BOOK
export function updateBook(book) {
    const request = axios.patch('/api/books/book', book)
    .then( response => {
        return response.data
    }).catch((err)=> {
        return err
    } )
    return {
        type: BOOK_UPDATE,
        payload: request
    }
}

//GET ALL BOOKS
export function getAllBooks(
    limit = 50,
    start = 0,
    order = 'asc',
    list
) {
    const request = axios.get(`/api/books/all?limit=${limit}&skip=${start}&order=${order}`)
        .then( response => {
            return list ? [...list,...response.data] : response.data
        }).catch((err)=> {
            return err
        });

    return {
        type: BOOKS_GET_ALL,
        payload: request
    }
}