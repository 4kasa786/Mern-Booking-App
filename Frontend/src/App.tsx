
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'
import Register from './Pages/Register'
import SignIn from './Pages/SignIn'
function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout>
            <p>home Page</p>
          </Layout>
          }> </Route>
          <Route path='/search' element={<Layout>
            <p>Search Page</p>
          </Layout>}></Route>
          <Route path='/register' element={
            <Layout>
              <Register />
            </Layout>
          }>
          </Route>
          <Route path='/sign-in' element={
            <Layout>
              <SignIn />
            </Layout>
          }>

          </Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
