import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

const ListBooks = ({ books, onUpdateShelf }) => {
  const shelves = [
    { id: 'currentlyReading', title: 'Currently Reading' },
    { id: 'wantToRead', title: 'Want to Read' },
    { id: 'read', title: 'Read' },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <Bookshelf
            key={shelf.id}
            title={shelf.title}
            books={books.filter((book) => book.shelf === shelf.id)}
            onUpdateShelf={onUpdateShelf}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
