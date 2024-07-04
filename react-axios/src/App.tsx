import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Book from "./components/book";
import AddBook from "./components/ add-book";
import BookList from "./components/ books-list";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/books"} className="navbar-brand">
          Livros
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/books"]} component={BookList} />
          <Route exact path="/add" component={AddBook} />
          <Route path="/books/:id" component={Book} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
