import {BrowserRouter, Route, Switch} from 'react-router-dom'

// page components
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Graph from './pages/graph/Graph'

// import config from './firebase/config'

function App() {

  return (
    <div className="App">
          <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/graph">
              <Graph></Graph>
            </Route>
        </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App
