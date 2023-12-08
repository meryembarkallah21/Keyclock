import React, { useEffect, useState } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { booksApi } from '../misc/BooksApi'
import BookCard from '../home/BookCard'
import BookComments from './BookComments'
import BookCommentForm from './BookCommentForm'
import { useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function BookDetail() {
  const [authenticated, setAuthenticated] = useState(false)
  const [book, setBook] = useState(null)
  const [commentText, setCommentText] = useState('')
  
  const { keycloak } = useKeycloak()
  const { id } = useParams()

  useEffect(() => {
    const isbnId = id
    setAuthenticated(keycloak.authenticated)

    const fetchBook = async () => {
      try {
        const response = await booksApi.getBook(isbnId)
        const book = response.data
        setBook(book)
      } catch (error) {
        handleLogError(error)
      }
    }
    fetchBook()
  }, [id, keycloak.authenticated])

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'commentText') {
      setCommentText(value)
    }
  }

  const handleAddComment = async () => {
    if (!commentText) {
      return
    }

    const comment = { text: commentText }
    try {
      const response = await booksApi.addBookComment(book.isbnId, comment, keycloak.token)
      const updatedBook = response.data

      setBook(updatedBook)
      setCommentText('')
    } catch (error) {
      handleLogError(error)
    }
  }

  return (
    !book ? <></> : (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <BookCard book={book} link={false} />
            </Grid.Column>
            <Grid.Column width={11}>
              <BookCommentForm
                authenticated={authenticated}
                commentText={commentText}
                handleAddComment={handleAddComment}
                handleChange={handleChange}
              />
              <BookComments comments={book.comments} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  )
}

export default BookDetail