import React from 'react'
import { Button, Image, Table } from 'semantic-ui-react'

function BooksTable({ books, handleDeleteBook, handleEditBook }) {
  const height = window.innerHeight - 100
  const style = {
    height: height,
    maxHeight: height,
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  const bookList = books && books.map(book => {
    return (
      <Table.Row key={book.isbnId}>
        <Table.Cell collapsing>
          <Button
            circular
            color='red'
            size='small'
            icon='trash'
            onClick={() => handleDeleteBook(book)}
          />
          <Button
            circular
            color='orange'
            size='small'
            icon='edit'
            onClick={() => handleEditBook(book)}
          />
        </Table.Cell>
        <Table.Cell>{book.isbnId}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.director}</Table.Cell>
        <Table.Cell>{book.year}</Table.Cell>
        <Table.Cell>
          <Image size='tiny' src={book.poster ? book.poster : '/images/book-poster.png'} rounded />
        </Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div style={style}>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={2}>IsbnID</Table.HeaderCell>
            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
            <Table.HeaderCell width={3}>Director</Table.HeaderCell>
            <Table.HeaderCell width={2}>Year</Table.HeaderCell>
            <Table.HeaderCell width={3}>Poster</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </div>
  )
}

export default BooksTable