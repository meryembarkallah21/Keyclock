import React from 'react'
import { Card } from 'semantic-ui-react'
import BookCard from '../home/BookCard'

function CompleteStep({ book }) {
  return (
    <Card.Group doubling centered>
      <BookCard book={book} link={false} />
    </Card.Group>
  )
}

export default CompleteStep