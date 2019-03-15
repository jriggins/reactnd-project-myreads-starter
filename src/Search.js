import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book.js';
import PropTypes from 'prop-types';

export default function Search({query, books, onSearchRequested, onBookshelfChange}) {
  const getQueryFromEvent = (event) => event.target.value;
  const onSearchQueryTextChange = (event) => onSearchRequested(getQueryFromEvent(event));
  const booksFromSearch = (books) => Object.values(books);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
          <input type="text" placeholder="Search by title or author" value={query} onChange={onSearchQueryTextChange}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {booksFromSearch(books).map((book) => (
            <li key={book.id}>
              <Book book={book} onBookshelfChange={onBookshelfChange}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  onSearchRequested: PropTypes.func.isRequired,
  onBookshelfChange: PropTypes.func.isRequired
};

