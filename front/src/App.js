import React from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/home/Home'
import { booksApi } from './components/misc/BooksApi'
import Navbar from './components/misc/Navbar'
import PrivateRoute from './components/misc/PrivateRoute'
import BooksPage from './components/books/BooksPage'
import UserSettings from './components/settings/UserSettings'
import BookWizard from './components/wizard/BookWizard'
import BookDetail from './components/book/BookDetail'
import { Dimmer, Header, Icon } from 'semantic-ui-react'
import { config } from './Constants'

function App() {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: "company-services",
    clientId: "books-app"
  })
  const initOptions = { pkceMethod: 'S256' }

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        let response = await booksApi.getUserExtrasMe(keycloak.token)
        if (response.status === 404) {
          const username = keycloak.tokenParsed.preferred_username
          const userExtra = { avatar: username }
          response = await booksApi.saveUserExtrasMe(keycloak.token, userExtra)
          console.log('UserExtra created for ' + username)
        }
        keycloak['avatar'] = response.data.avatar
      }
    }
  }

  const loadingComponent = (
    <Dimmer inverted active={true} page>
      <Header style={{ color: '#4d4d4d' }} as='h2' icon inverted>
        <Icon loading name='cog' />
        <Header.Content>Keycloak is loading
          <Header.Subheader style={{ color: '#4d4d4d' }}>or running authorization code flow with PKCE</Header.Subheader>
        </Header.Content>
      </Header>
    </Dimmer>
  )

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      LoadingComponent={loadingComponent}
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/books/:id' element={<BookDetail />} />
          <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
          <Route path="/wizard" element={<PrivateRoute><BookWizard /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  )
}

export default App