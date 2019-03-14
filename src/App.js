import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksApi from './BooksAPI.js'
import Home from './Home.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  mapBookJsonToBook = (books) => (books.map(this.getCoverUrlFrom))

  setStateWithBooks = (books) => (this.setState({books}))

  getCoverUrlFrom = (book) => ({...book, coverUrl: book.imageLinks.thumbnail})

  getAllBooks = () => {
    return BooksApi.getAll()
      .then(this.mapBookJsonToBook)
      .then(this.setStateWithBooks)
  }

  componentDidMount() {
    this.getAllBooks()
  }

  updateBookState = (updatedBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== updatedBook.id), updatedBook]
    }))
  }

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
        <Route exact path="/search" render={() => <Search/>}/>
      </div>
    )
  }
}

export default BooksApp
