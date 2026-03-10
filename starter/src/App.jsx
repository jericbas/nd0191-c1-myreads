import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      if (shelf === 'none') {
        setBooks(books.filter((b) => b.id !== book.id));
      } else {
        const updatedBook = { ...book, shelf };
        const existingBook = books.find((b) => b.id === book.id);
        if (existingBook) {
          setBooks(books.map((b) => (b.id === book.id ? updatedBook : b)));
        } else {
          setBooks([...books, updatedBook]);
        }
      }
    });
  };

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <ListBooks books={books} onUpdateShelf={updateBookShelf} />
        </Route>
        <Route path="/search">
          <SearchPage myBooks={books} onUpdateShelf={updateBookShelf} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
