import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addContact" component={AddEdit} />
          <Route exact path="/update/:id" component={AddEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
