import React from 'react';
import Shelf from './Shelf.js';
import PropTypes from 'prop-types';

export default function Bookshelf({books, onBookshelfChange}) {
  return (
    <div className="list-books-content">
      <div>
        <Shelf id="currentlyReading" name="Currently Reading" books={books} onBookshelfChange={onBookshelfChange}/>
        <Shelf id="wantToRead" name="Want to Read" books={books} onBookshelfChange={onBookshelfChange}/>
        <Shelf id="read" name="Read" books={books} onBookshelfChange={onBookshelfChange}/>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.object.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};
