import React from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'
import BookCard from './BookCard'

function BookList({ books }) {
  const bookList = books.map(book => <BookCard key={book.isbnId} book={book} link={true} />)

  return (
    books.length > 0 ? (
      <Card.Group doubling centered>
        {bookList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No books</Header>
        </Segment>
      )
  )
}

export default BookList