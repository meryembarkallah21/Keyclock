import React, { useState } from 'react'
import { Button, Container, Grid, Icon, Step, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { booksApi } from '../misc/BooksApi'
import { omdbApi } from '../misc/OmdbApi'
import CompleteStep from './CompleteStep'
import FormStep from './FormStep'
import SearchStep from './SearchStep'
import { Navigate } from 'react-router-dom'
import { isAdmin } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function BookWizard() {

  const [step, setStep] = useState(1)

  // Search Step
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  // Form Step
  const [isbnId, setIsbnId] = useState('')
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [year, setYear] = useState('')
  const [poster, setPoster] = useState('')
  const [isbnIdError, setIsbnIdError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [directorError, setDirectorError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  const handlePreviousStep = () => {
    if (step === 2) {
      setIsbnIdError(false)
      setTitleError(false)
      setDirectorError(false)
      setYearError(false)
    }
    setStep(step > 1 ? step - 1 : step)
  }

  const handleNextStep = () => {
    if (step === 2 && !isValidForm()) {
      return
    }
    setStep(step < 3 ? step + 1 : step)
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'searchText') {
      setSearchText(value);
    } else if (id === 'isbnId') {
      setIsbnId(value);
    } else if (id === 'title') {
      setTitle(value);
    } else if (id === 'director') {
      setDirector(value);
    } else if (id === 'year') {
      setYear(value);
    } else if (id === 'poster') {
      setPoster(value);
    }
  }

  const handleTableSelection = (book) => {
    if (book && selectedBook && book.isbnId === selectedBook.isbnId) {
      setSelectedBook(null)
      setIsbnId('')
      setTitle('')
      setDirector('')
      setYear('')
      setPoster('')
    } else {
      setSelectedBook(book)
      setIsbnId(book.isbnId)
      setTitle(book.title)
      setDirector(book.director)
      setYear(book.year)
      setPoster(book.poster)
    }
  }

  const handleSearchBooks = async () => {
    try {
      setIsLoading(true)
      const response = await omdbApi.getBooks(searchText)
      let booksArr = []
      const { Error } = response.data
      if (Error) {
        console.log(Error)
      } else {
        const book = {
          isbnId: response.data.isbnID,
          title: response.data.Title,
          director: response.data.Director,
          year: response.data.Year,
          poster: response.data.Poster
        }
        booksArr.push(book)
      }
      setBooks(booksArr)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBook = async () => {
    const book = { isbnId, title, director, year, poster }
    try {
      await booksApi.saveBook(book, keycloak.token)
      navigate("/home")
    } catch (error) {
      handleLogError(error)
    }
  }

  const isValidForm = () => {
    const isbnIdError = isbnId.trim() === ''
    const titleError = title.trim() === ''
    const directorError = director.trim() === ''
    const yearError = year.trim() === ''

    setIsbnIdError(isbnIdError)
    setTitleError(titleError)
    setDirectorError(directorError)
    setYearError(yearError)

    return !(isbnIdError || titleError || directorError || yearError)
  }

  const getContent = () => {
    let stepContent = null
    if (step === 1) {
      stepContent = (
        <SearchStep
          searchText={searchText}
          isLoading={isLoading}
          books={books}
          selectedBook={selectedBook}
          handleChange={handleChange}
          handleSearchBooks={handleSearchBooks}
          handleTableSelection={handleTableSelection}
        />
      )
    } else if (step === 2) {
      stepContent = (
        <FormStep
          isbnId={isbnId}
          title={title}
          director={director}
          year={year}
          poster={poster}
          isbnIdError={isbnIdError}
          titleError={titleError}
          directorError={directorError}
          yearError={yearError}
          handleChange={handleChange}
        />
      )
    } else if (step === 3) {
      const book = { isbnId, title, director, year, poster }
      stepContent = (
        <CompleteStep book={book} />
      )
    }

    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Step.Group fluid vertical >
              <Step active={step === 1}>
                <Icon name='search' />
                <Step.Content>
                  <Step.Title>Search</Step.Title>
                  <Step.Description>Search book</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 2}>
                <Icon name='film' />
                <Step.Content>
                  <Step.Title>Book</Step.Title>
                  <Step.Description>Book Form</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 3}>
                <Icon name='flag checkered' />
                <Step.Content>
                  <Step.Title>Complete</Step.Title>
                  <Step.Description>Preview and complete</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

            <Button.Group fluid>
              <Button
                disabled={step === 1}
                onClick={handlePreviousStep}>Back</Button>
              <Button.Or />
              <Button
                positive
                disabled={step === 3}
                onClick={handleNextStep}>Next</Button>
            </Button.Group>

            {step === 3 && (
              <>
                <Divider />
                <Button fluid color='blue' onClick={handleCreateBook}>Create</Button>
              </>
            )}
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            {stepContent}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }


  return keycloak && keycloak.authenticated && isAdmin(keycloak) ? getContent() : <Navigate to='/' />
}

export default BookWizard