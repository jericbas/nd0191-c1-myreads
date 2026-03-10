import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const SearchPage = ({ myBooks, onUpdateShelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      BooksAPI.search(query).then((data) => {
        if (data.error) {
          setResults([]);
        } else {
          const booksWithShelf = data.map((book) => {
            const myBook = myBooks.find((b) => b.id === book.id);
            return { ...book, shelf: myBook ? myBook.shelf : 'none' };
          });
          setResults(booksWithShelf);
        }
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, myBooks]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks?.thumbnail || ''}")`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf || 'none'}
                      onChange={(e) => onUpdateShelf(book, e.target.value)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
              <Link to={`/book/${book.id}`}>{book.title}</Link>
            </div>
                <div className="book-authors">{book.authors?.join(', ')}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
