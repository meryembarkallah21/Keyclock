import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function BookCard({ book, link }) {
  const content = (
    <>
      <Image src={book.poster ? book.poster : '/images/book-poster.png'} wrapped ui={false} />
      <Card.Content textAlign="center">
        <Card.Header>{book.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>isbnID: <strong>{book.isbnId}</strong></Card.Description>
        <Card.Description>Author: <strong>{book.director}</strong></Card.Description>
        <Card.Description>Year: <strong>{book.year}</strong></Card.Description>
      </Card.Content>
    </>
  )
  return (
    !link ? <Card>{content}</Card> : <Card as={Link} to={`/books/${book.isbnId}`}>{content}</Card>
  )
}

export default BookCard