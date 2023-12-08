import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { booksApi } from '../misc/BooksApi'
import BookList from './BookList'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      try {
        const response = await booksApi.getBooks()
        const books = response.data

        setBooks(books)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return (
    isLoading ? <></> : (
      <Container>
        <BookList books={books} />
      </Container>
    )
  )
}

export default Home