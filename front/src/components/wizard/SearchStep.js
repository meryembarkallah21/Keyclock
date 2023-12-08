import React from 'react'
import { Form, Segment, Table } from 'semantic-ui-react'

function SearchStep({ searchText, isLoading, books, selectedBook, handleChange, handleSearchBooks, handleTableSelection }) {
  const bookList = books ? books.map(book => {
    const active = book && selectedBook && book.isbnId === selectedBook.isbnId
    return (
      <Table.Row key={book.isbnId} active={active} onClick={() => handleTableSelection(book)}>
        <Table.Cell>{book.isbnId}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.director}</Table.Cell>
        <Table.Cell>{book.year}</Table.Cell>
      </Table.Row>
    )
  }) : (<Table.Row>
    <Table.Cell></Table.Cell>
  </Table.Row>
    )

  return (
    <Segment loading={isLoading}>
      <Form onSubmit={handleSearchBooks}>
        <Form.Group unstackable>
          <Form.Input
            placeholder='Search for a book title ...'
            id='searchText'
            value={searchText}
            onChange={handleChange}
            fluid
            width={12}
          />
          <Form.Button
            color='blue'
            content='Search'
            disabled={searchText.trim() === ''}
            fluid
            width={4}
          />
        </Form.Group>
      </Form>

      <Table compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IsbnID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Director</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default SearchStep