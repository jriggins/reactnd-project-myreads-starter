import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksApi from './BooksAPI.js'
import Home from './Home.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }

  mapBookJsonToBook = (books) => ( books.map(this.getCoverUrlFrom) )

  setStateWithBooks = (books) => ( this.setState({books}) )

  getCoverUrlFrom = (book) => ( {...book, coverUrl: book.imageLinks.thumbnail} )

  getAllBooks = () => {
    return BooksApi.getAll()
      .then(this.mapBookJsonToBook)
      .then(this.setStateWithBooks)
  }

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => <Home books={this.state.books}/>} />
          <Route exact path="/search" render={() => <Search />} />
      </div>
    )
  }
}

export default BooksApp
