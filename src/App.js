import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksApi from './BooksAPI.js';
import Home from './Home.js';
import Search from './Search.js';

class BooksApp extends React.Component {
  state = {
    myBooks: {},
    booksFromSearch: {},
    query: '',
  };

  componentDidMount() {
    this.getMyBooks();
  }

  getMyBooks = () => {
    return BooksApi.getAll()
      .then(this.mapResultsToBooks)
      .then(this.setMyBooksState);
  }

  mapMyBooksIntoSearchResults = (books) => {
    return books.map((book) => this.state.myBooks[book.id] || book);
  }

  findBooks = (query) => {
    return BooksApi.search(query)
      .then(this.mapResultsToBooks)
      .then(this.mapMyBooksIntoSearchResults)
      .then(this.setBooksFromSearchState);
  }

  onSearchRequested = (query) => {
    this.setState({query: query});
    this.findBooks(query);
  }

  mapListToObject = (list) => {
    return list.reduce((obj, item) => Object.assign(obj, {[item.id]: item}), {});
  }

  setBooksFromSearchState = (books) => {
    this.setState({
      booksFromSearch: this.mapListToObject(books)
    });
  }

  mapResultsToBooks = (results) => {
    const isResultsSuccess = results && !results.error;
    const resultsOrEmpty = isResultsSuccess ? results : [];
    const bookMissingImageLinks = (book) => book.imageLinks !== undefined;
    const getCoverUrlFromImageLinks = (book) => ({...book, coverUrl: book.imageLinks.thumbnail});

    return resultsOrEmpty
      .filter(bookMissingImageLinks)
      .map(getCoverUrlFromImageLinks);
  }

  setMyBooksState = (books) => {
    this.setState({books, myBooks: this.mapListToObject(books)});
  }

  updateMyBooksState = (updatedBook) => {
    this.setState((prevState) => ({
      myBooks: {...prevState.myBooks, [updatedBook.id]: updatedBook},
    }));
  }

  updateMyBooksInSearchResults = (updatedBook) => {
    if (updatedBook.id in this.state.booksFromSearch) {
      this.setState((prevState) => ({
        booksFromSearch: {...prevState.booksFromSearch, [updatedBook.id]: updatedBook},
      }));
    }
  }

  updateBookshelfAtServer = (updatedBook) => {
    return BooksApi
      .update(updatedBook, updatedBook.shelf)
      .then(() => updatedBook);
  }

  onBookshelfChange = (updatedBook) => {
    this.updateMyBooksState(updatedBook);
    this.updateMyBooksInSearchResults(updatedBook);
    this.updateBookshelfAtServer(updatedBook);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home books={this.state.myBooks} onBookshelfChange={this.onBookshelfChange}/>}/>
        <Route exact path="/search" render={() =>
          <Search books={this.state.booksFromSearch}
                  query={this.state.query}
                  onSearchRequested={this.onSearchRequested}
                  onBookshelfChange={this.onBookshelfChange}/>}
        />
      </div>
    );
  }
}

export default BooksApp;
