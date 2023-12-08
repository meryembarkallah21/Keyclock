import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Segment, Icon, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { booksApi } from '../misc/BooksApi'
import BooksForm from './BooksForm'
import BooksTable from './BooksTable'
import { isAdmin } from '../misc/Helpers'
import { Navigate } from 'react-router-dom'
import ConfirmationModal from '../misc/ConfirmationModal'
import { useKeycloak } from '@react-keycloak/web'

const formInitialState = {
  isbnId: '',
  title: '',
  director: '',
  year: '',
  poster: '',

  isbnIdError: false,
  titleError: false,
  directorError: false,
  yearError: false
}

const modalInitialState = {
  isOpen: false,
  header: '',
  content: '',
  onAction: null,
  onClose: null
}

function BooksPage() {

  const [books, setBooks] = useState([])
  const [form, setForm] = useState({ ...formInitialState })
  const [modal, setModal] = useState({ ...modalInitialState })
  const [bookToBeDeleted, setBookToBeDeleted] = useState(null)

  const { keycloak } = useKeycloak()

  useEffect(() => {
    handleGetBooks()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [id]: value }))
  }

  const handleGetBooks = async () => {
    try {
      const response = await booksApi.getBooks()
      const books = response.data
      setBooks(books)
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSaveBook = async () => {
    if (!isValidForm()) {
      return
    }

    const { isbnId, title, director, year, poster } = form
    const book = { isbnId, title, director, year, poster }
    try {
      await booksApi.saveBook(book, keycloak.token)
      clearForm()
      handleGetBooks()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleDeleteBook = (book) => {
    const modal = {
      isOpen: true,
      header: 'Delete Book',
      content: `Would you like to delete book '${book.title}'?`,
      onAction: handleActionModal,
      onClose: handleCloseModal
    }
    setBookToBeDeleted(book)
    setModal(modal)
    // The deletion is done in handleActionModal function
  }

  const handleEditBook = (book) => {
    const form = {
      isbnId: book.isbnId,
      title: book.title,
      director: book.director,
      year: book.year,
      poster: book.poster,
      isbnIdError: false,
      titleError: false,
      directorError: false,
      yearError: false
    }
    setForm(form)
  }

  const clearForm = () => {
    setForm({ ...formInitialState })
  }

  const isValidForm = () => {
    const isbnIdError = form.isbnId.trim() === ''
    const titleError = form.title.trim() === ''
    const directorError = form.director.trim() === ''
    const yearError = form.year.trim() === ''

    setForm((prevForm) => ({
      ...prevForm,
      isbnIdError,
      titleError,
      directorError,
      yearError
    }))

    return !(isbnIdError || titleError || directorError || yearError)
  }

  const handleActionModal = async (response, book) => {
    if (response) {
      try {
        await booksApi.deleteBook(book.isbnId, keycloak.token)
        handleGetBooks()
      } catch (error) {
        handleLogError(error)
      }
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModal({ ...modalInitialState })
    setBookToBeDeleted(null)
  }

  if (!isAdmin(keycloak)) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Segment>
            <Header as='h2'>
              <Icon name='video camera' />
              <Header.Content>Books</Header.Content>
            </Header>
            <Divider />
            <BooksForm
              form={form}
              handleChange={handleChange}
              handleSaveBook={handleSaveBook}
              clearForm={clearForm}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <BooksTable
            books={books}
            handleDeleteBook={handleDeleteBook}
            handleEditBook={handleEditBook}
          />
        </Grid.Column>
      </Grid>

      <ConfirmationModal
        modal={modal}
        book={bookToBeDeleted}
      />
    </Container>
  )
}

export default BooksPage