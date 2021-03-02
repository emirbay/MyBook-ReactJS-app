import React, {useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {getBook, clearBook }  from '../../store/actions/book_actions';

const Article = (props) => {

    const article = useSelector (state => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBook(props.match.params.id));
        return (()=>{
            dispatch(clearBook());
        })
    }, [dispatch, props])

    console.log(article);

    const showArticle = () => {
        if (article.singleBook){
            const articleData = article.singleBook;

            return (
            <div className="single_article_container">
                <div className="top">
                    <h3>{articleData.name}</h3>
                    <div><span>Author: </span>{articleData.author}</div>
                    <div><span>Rating: </span>{articleData.rating}</div>
                </div>
                <div className="content"
                    dangerouslySetInnerHTML={{__html: articleData.content}}>
                </div>
                <div>
                    <i>Posted by { articleData.ownerId ? articleData.ownerId.name : null}  { articleData.ownerId ? articleData.ownerId.lastname : null}</i>
                </div>
                <br/>
            </div>)

        }
    }

    return(
        <div className="container">
            {showArticle()}
            <div>
                {article.singleBook === false ?             // if user manipulate id in URL or book is removed
                        <div>Sorry, requested content not exists!</div> : null
                }
            </div>
        </div>
    )
}

export default Article;
// dont need to use connect (using dispatch)