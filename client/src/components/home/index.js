import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllBooks} from '../../store/actions/book_actions';
import { RowGenerator, GeneratedRowsWithBlocks } from '../../utils/helpers';

class Home extends Component {
    componentDidMount(prevProps){
        //console.log(this.props)
        if (!this.props.books.bookCollection){      // get books only if bookCollection is null
            this.props.dispatch(getAllBooks(6,0,'desc'))
        }
    
    }

    loadMore = () => {
        let bookList = this.props.books.bookCollection;
        let booksCount = bookList.length;

        this.props.dispatch(getAllBooks(2,booksCount,'desc',bookList))

    }

    showArticles = (books) => {
        if (books.bookCollection) {
              
            const rowArray = RowGenerator(books.bookCollection,2 );
            //console.log(rowArray);  // returns [[],[],[]]
            const generatedArticles = GeneratedRowsWithBlocks(rowArray,'six')
            
            return generatedArticles;
        }
        return false;
      

    }

    render(){
        //console.log(this.props);
        return (
        <div className="container">
           <div className="row articles_container">
            {this.showArticles(this.props.books)}
           </div>
           <div className="loadmore"
           onClick={this.loadMore}>
               Load more
           </div>

        </div>
        
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(Home);