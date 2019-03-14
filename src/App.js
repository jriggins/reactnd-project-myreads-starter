import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksApi from './BooksAPI.js'
import Home from './Home.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksFromSearch: [],
    myBooks: [],
    query: '',
  }

  componentDidMount() {
    this.getMyBooks()
      .then(this.setBooksStateFromServer)
  }

  getMyBooks = () => {
    return BooksApi.getAll()
      .then(this.fromJsonToBook)
  }

  getAllBooksFromSearch = (query) => {
    return BooksApi.search(query)
      .then(this.fromJsonToBook)
      .then((books) => books.map((book) => this.state.myBooks[book.id] || book))
  }

  onSearchRequested = (query) => {
    this.setState({query: query})
    this.getAllBooksFromSearch(query)
      .then(this.updateBookFromSearch)
  }

  updateBookFromSearch = (booksFromSearch) => {
    this.setState({booksFromSearch})
  }

  fromJsonToBook = (books) => {
    books = (books && !books.error) ? books : []
    return books.filter((book) => book.imageLinks !== undefined).map(this.getCoverUrlFrom)
  }

  getCoverUrlFrom = (book) => ({...book, coverUrl: book.imageLinks.thumbnail})

  setBooksStateFromServer = (books) => this.setState({books, myBooks: this.getMyBooksFromList(books)})

  updateBookState = (updatedBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== updatedBook.id), updatedBook],
      myBooks: {...prevState.myBooks, [updatedBook.id]: updatedBook},
      booksFromSearch: prevState.booksFromSearch.map((book) => prevState.myBooks[book.id] || book)
    }))
  }

  getMyBooksFromList = (books) => { return books.reduce((obj, book) => (Object.assign(obj, {[book.id]: book})), {}) }

  updateBookshelf = (updatedBook) => {
    return BooksApi
      .update(updatedBook, updatedBook.shelf)
      .then(() => updatedBook)
  }

  onBookshelfChange = (updatedBook) => {
    this
      .updateBookshelf(updatedBook)
      .then(this.updateBookState)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home books={this.state.books} onBookshelfChange={this.onBookshelfChange}/>}/>
        <Route exact path="/search" render={() => <Search books={this.state.booksFromSearch}
                                                          query={this.state.query}
                                                          onSearchRequested={this.onSearchRequested}
                                                          onBookshelfChange={this.onBookshelfChange}/>}/>
      </div>
    )
  }
}

export default BooksApp
