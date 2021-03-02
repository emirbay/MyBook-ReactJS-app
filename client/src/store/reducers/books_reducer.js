import { 
    BOOK_ADD,
    BOOK_CLEAR,
    BOOK_GET,
    BOOK_UPDATE,
    BOOKS_GET_ALL
} from '../types'

export default function(state={},action){
    switch(action.type){
        case BOOK_ADD:
            return {...state, add: action.payload}
        case BOOK_CLEAR:
            // action.payload is null
            return {...state, add: action.payload, singleBook: action.payload, updatedBook: action.payload }
        case BOOK_GET:
             return {...state, singleBook: action.payload}
        case BOOK_UPDATE:
            return {...state, updatedBook: action.payload}
        case BOOKS_GET_ALL:
            return {...state, bookCollection: action.payload}
        default:
            return state 
    }
}