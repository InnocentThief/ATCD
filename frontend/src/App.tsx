import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routing from './components/Routing'

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </>
    )
  }
}

export default App
