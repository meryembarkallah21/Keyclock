import axios from 'axios'
import { config } from '../../Constants'


export const booksApi = {
  getBooks,
  getBook,
  saveBook,
  deleteBook,
  addBookComment,
  getUserExtrasMe,
  saveUserExtrasMe
}

function getBooks() {
  return instance.get('/api/books')
}

function getBook(isbnId) {
  return instance.get(`/api/books/${isbnId}`)
}

function saveBook(book, token) {
  return instance.post('/api/books', book, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function deleteBook(isbnId, token) {
  return instance.delete(`/api/books/${isbnId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function addBookComment(isbnId, comment, token) {
  return instance.post(`/api/books/${isbnId}/comments`, comment, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function getUserExtrasMe(token) {
  return instance.get(`/api/userextras/me`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function saveUserExtrasMe(token, userExtra) {
  return instance.post(`/api/userextras/me`, userExtra, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.response.use(response => {
  return response
}, function (error) {
  if (error.response.status === 404) {
    return { status: error.response.status }
  }
  return Promise.reject(error.response)
})

// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`
}