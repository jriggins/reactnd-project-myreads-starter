import React from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';

export default function Shelf({id, name, books, onBookshelfChange}) {
  const booksByShelf = (books, shelfId) => Object.values(books).filter((book) => book.shelf === shelfId);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksByShelf(books, id).map((book) => (
            <li key={book.id}>
              <Book book={book} onBookshelfChange={onBookshelfChange}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};
