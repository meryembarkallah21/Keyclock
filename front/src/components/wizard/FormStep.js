import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

function FormStep({ isbnId, title, director, year, poster, isbnIdError, titleError, directorError, yearError, handleChange }) {
  return (
    <Segment>
      <Form>
        <Form.Input
          label='ISBN ID'
          id='isbnId'
          onChange={handleChange}
          value={isbnId}
          error={isbnIdError}
        />
        <Form.Input
          fluid
          label='Title'
          id='title'
          onChange={handleChange}
          value={title}
          error={titleError}
        />
        <Form.Input
          fluid
          label='Director'
          id='director'
          onChange={handleChange}
          value={director}
          error={directorError}
        />
        <Form.Input
          label='Year'
          id='year'
          onChange={handleChange}
          value={year}
          error={yearError}
        />
        <Form.Input
          fluid
          label='Poster'
          id='poster'
          onChange={handleChange}
          value={poster}
        />
      </Form>
    </Segment>
  )
}

export default FormStep
