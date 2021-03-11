import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

        </Switch>

      </Router>
      <Footer />
    </div>
  );
}

export default App;
