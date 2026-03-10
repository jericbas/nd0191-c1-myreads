import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const BookDetail = ({ myBooks, onUpdateShelf }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const myBook = myBooks.find((b) => b.id === id);
    if (myBook) {
      setBook(myBook);
      setLoading(false);
    } else {
      BooksAPI.get(id).then((data) => {
        setBook(data);
        setLoading(false);
      });
    }
  }, [id, myBooks]);

  if (loading) {
    return (
      <div className="book-detail">
        <div className="book-detail-loading">
          <h2>Loading book details...</h2>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail">
        <div className="book-detail-error">
          <h2>Book not found</h2>
          <Link to="/">Back to MyReads</Link>
        </div>
      </div>
    );
  }

  const handleShelfChange = (e) => {
    onUpdateShelf(book, e.target.value);
  };

  const bookCoverStyle = {
    width: 200,
    height: 300,
    backgroundImage: `url("${book.imageLinks?.thumbnail || ''}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <Link className="close-search" to="/">
          Back
        </Link>
      </div>
      <div className="book-detail-content">
        <div className="book-detail-left">
          <div className="book-cover" style={bookCoverStyle} />
          <div className="book-shelf-changer" style={{ marginTop: 20 }}>
            <select value={book.shelf || 'none'} onChange={handleShelfChange}>
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
        <div className="book-detail-right">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-authors">
            {book.authors?.join(', ') || 'Unknown Author'}
          </p>
          {book.publisher && (
            <p className="book-info">
              <strong>Publisher:</strong> {book.publisher}
            </p>
          )}
          {book.publishedDate && (
            <p className="book-info">
              <strong>Published:</strong> {book.publishedDate}
            </p>
          )}
          {book.pageCount && (
            <p className="book-info">
              <strong>Pages:</strong> {book.pageCount}
            </p>
          )}
          {book.categories && (
            <p className="book-info">
              <strong>Categories:</strong> {book.categories.join(', ')}
            </p>
          )}
          {book.averageRating && (
            <p className="book-info">
              <strong>Rating:</strong> {book.averageRating} / 5
            </p>
          )}
          {book.description && (
            <div className="book-description">
              <strong>Description:</strong>
              <p dangerouslySetInnerHTML={{ __html: book.description }} />
            </div>
          )}
          {book.infoLink && (
            <p>
              <a
                href={book.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                More info on Google Books
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
