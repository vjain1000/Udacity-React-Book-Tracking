import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from "react-router-dom";

class Search extends React.Component
{
  
  	state = {
      query: '',
      books: []
    }

    handleChange(query)
	{
      if (query !== "")
      {
      const books = BooksAPI.search(query, 20);
      books.then(resp => {
        		if (!resp || resp.error)
                {
                	this.setState( (prevState) => ({query: prevState.query, books: [] }));  
                }
        		else
                {
        			this.setState( (prevState) => ({query: prevState.query, books: resp }));
				}
      		});
      }
      else
      {
      	this.setState( (prevState) => ({query: prevState.query, books: [] }));
      }
	}
  
   	render()
  	{
    	return(
    	<div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
			 <Link to="../">Main Page</Link>
              <ol className="books-grid">
                {this.state.books.map(function(name, index){
                    const isShelved = this.props.books.filter(book => book.id === name.id);
					const urlThumbnail = name.imageLinks === undefined || name.imageLinks.thumbnail === undefined ? '' : name.imageLinks.thumbnail;

                    return <li key={name.id}> 
                          <div className="book" key={name.id}>
                          <div className="book-top" key={name.id}>
                  			<div className="book-cover" key={name.id} style={{width: 128, height: 193, backgroundImage: 'url(' + urlThumbnail + ')'}}>
								<div key={name.id} className="book-shelf-changer">
                              	<select key={name.id} name={name.id} onChange={this.props.Change} value={isShelved !== undefined && isShelved.length > 0 && isShelved[0].shelf !== undefined ? isShelved[0].shelf : "none"}>
                               		<option key="move" value="move" disabled>Move to...</option>
                                	<option key="currentlyReading" value="currentlyReading">Currently Reading</option>
                                	<option key="wantToRead" value="wantToRead">Want to Read</option>
                                	<option key="read" value="read" >Read</option>
                                	<option key="none" value="none">None</option>
                              	</select>
                            	</div>
						    </div>
							</div>
							</div>
							<div className="book-title" key={name.title}>{name.title}</div>
							{name.authors !== undefined && (name.authors.map( author => {return <div className="book-authors" key={author}>{author}</div>;}))}
							</li>;
                  }.bind(this))}
			  </ol>
            </div>
          </div>
      );
  }
}

export default Search