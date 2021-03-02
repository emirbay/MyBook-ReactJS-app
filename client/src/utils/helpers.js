import React from 'react';
import  {Link} from 'react-router-dom';

export const RowGenerator = (list, cols) => {
    const rows = [...Array(Math.ceil(list.length / cols))];
    const articleRows = rows.map( 
        (row, i ) => {
        //console.log( i)
          return list.slice( i * cols, i*cols+cols)
        }
    );
    
    return articleRows;
}


export const GeneratedRowsWithBlocks = (rows,type) => (
    rows.map((row,i)=> (
        <div className="row" key={i}>
            {
                //[{…}, {…}]  
                row.map( (article,n) => (
                    <div key={article._id} className={`${type} columns article_block`}>
                        
                        <Link to={`/article/${article._id}`}>
                            <h3>{article.name}</h3>
                            <div className="content">
                                <div> <span>Author  </span>{article.author}</div>
                                <div> <span>Rating  </span>{article.rating}</div>
                                <div> <span>Price  </span>{article.price}</div>
                            </div>
                        </Link>
                    </div>

                ))
            }
        </div>
    ))
)