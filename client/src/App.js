import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LoginRoute from './components/RouteComponents/LoginRoute'
import PublicRoute from './components/RouteComponents/PublicRoute.jsx'
import VideoParty from './pages/VideoParty'
import VideoPartyProvider from './components/Party/VideoPartyProvider'
import useAuth from './hooks/useAuth'
import VideoPartyHelper from './components/Party/VideoPartyHelper/VideoPartyHelper'

function App() {
  useAuth()
  return (
    <VideoPartyProvider>
      <Router>
        <Switch>
          <LoginRoute path="/login">
            <LoginPage />
          </LoginRoute>
          <PublicRoute path="/party">
            <VideoPartyHelper />
          </PublicRoute>

          <Route path="*">
            <Redirect to="/party" />
          </Route>
        </Switch>
      </Router>
    </VideoPartyProvider>
  )
}
export default App
