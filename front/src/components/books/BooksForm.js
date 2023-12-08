import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function BooksForm({ form, handleChange, handleSaveBook, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label='IsbnID *'
        id='isbnId'
        onChange={handleChange}
        value={form.isbnId}
        error={form.isbnIdError}
      />
      <Form.Input
        fluid
        label='Title *'
        id='title'
        onChange={handleChange}
        value={form.title}
        error={form.titleError}
      />
      <Form.Input
        fluid
        label='Director *'
        id='director'
        onChange={handleChange}
        value={form.director}
        error={form.directorError}
      />
      <Form.Input
        fluid
        label='Year *'
        id='year'
        onChange={handleChange}
        value={form.year}
        error={form.yearError}
      />
      <Form.Input
        fluid
        label='Poster'
        id='poster'
        onChange={handleChange}
        value={form.poster}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={handleSaveBook}>Save</Button>
      </Button.Group>
    </Form>
  )
}

export default BooksForm