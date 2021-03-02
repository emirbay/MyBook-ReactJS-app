import React, { Component, isValidElement } from 'react'
import {Formik} from 'formik';
import {Link} from 'react-router-dom';
import AdminLayout from '../../../../hoc/adminLayout'
 
import {
    BookSchema,
    FormElement
} from './utils/postsHelper'

//WYSWYG
import {EditorState, ContentState} from 'draft-js'; //handle state
import htmlToDraft from 'html-to-draftjs';          // html from DB to editor area
import {stateToHTML} from 'draft-js-export-html'; // convert object
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {connect} from 'react-redux';
import {clearBook, getBook, updateBook}  from '../../../../store/actions/book_actions'


  class AddPosts extends Component {
    state= {
        editorState: '',
        editorContentHTML:'',
        success:false,
        loading: true,
        bookToEdit:{}
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState,
        })
    }
    // edit book
    onEditBook = (values) => {
         this.props.dispatch(updateBook(values))
    }

    componentDidUpdate(prevProps) {
        const hasChanged = this.props.books.singleBook !== prevProps.books.singleBook;
        // if post is updated
        const hasUpdated = this.props.books.updatedBook !== prevProps.books.updatedBook;
        //get props 
        const singleBook = this.props.books.singleBook;

          if (hasUpdated) {
              this.setState({success: true})
          }

          if(hasChanged) {
              if (singleBook !== false) {
                // convert html to object for wyswyg editor
                const objectFromHtml = htmlToDraft(singleBook.content);
                const {contentBlocks, entityMap } = objectFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks,entityMap);

                this.setState({
                    loading: false,
                    editorState: EditorState.createWithContent(contentState),
                    bookToEdit: 
                    {   _id: singleBook._id, // ? default
                        name: singleBook.name,
                        author:singleBook.author,
                    // content:"Content", handled by other component
                        pages:singleBook.pages,
                        rating:singleBook.rating,
                        price:singleBook.price 
                    }
                })
              }
              else {
                // not found id - redirect to / 
                 this.props.history.push('/');
              }
              
              
            }
    }

    // clear state on unmount
    componentWillUnmount() {
         this.props.dispatch(clearBook());
    }
    // fetch data
    componentDidMount() {
        // action id param from URL
        this.props.dispatch(getBook(this.props.match.params.id))
    }
    

    render() {
        return (
            this.state.loading ?
                 <>Loading</>
          :
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    enableReinitialize={true}  
                    initialValues={this.state.bookToEdit}
                    validationSchema={ BookSchema }
                    onSubmit={(values, {resetForm})=>{
                        this.onEditBook({
                            ...values,
                            content: stateToHTML(this.state.editorState.getCurrentContent())
                        })
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                })=>(
                    <form onSubmit={handleSubmit}>
                        
                         <input type="hidden"
                         name="_id"
                         value={values._id}
                         />

                        <FormElement
                            elData={{element:'input',type:'text', value: values.name}}
                            placeholder="The title of the book"
                            name="name"
                            onHandleChange={(e)=>handleChange(e)}
                            onHandleBlur={(e)=>handleChange(e)}
                            error={errors.name}
                            touched={touched.name}
                        />

                        <Editor
                            editorState={this.state.editorState}
                            //toolbarClassName="toolbarClassName"
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />

                        <h4>Book info</h4>
                        <FormElement
                            elData={{element:'input',type:'text', value: values.author}}
                            placeholder="Authors name"
                            name="author"
                            onHandleChange={(e)=>handleChange(e)}
                            onHandleBlur={(e)=>handleChange(e)}
                            error={errors.author}
                            touched={touched.author}
                        />

                        <FormElement
                            elData={{element:'input',type:'number', value: values.pages}}
                            placeholder="Number of pages"
                            name="pages"
                            onHandleChange={(e)=>handleChange(e)}
                            onHandleBlur={(e)=>handleChange(e)}
                            error={errors.pages}
                            touched={touched.pages}
                        />

                       <FormElement
                            elData={{element:'select', value: values.rating}}
                            name="rating"
                            onHandleChange={(e)=>handleChange(e)}
                            onHandleBlur={(e)=>handleChange(e)}
                            error={errors.rating}
                            touched={touched.rating}
                        >
                            <option default>Select a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                         </FormElement>

                         <FormElement
                            elData={{element:'input',type:'number', value: values.price}}
                            placeholder="Price"
                            name="price"
                            onHandleChange={(e)=>handleChange(e)}
                            onHandleBlur={(e)=>handleChange(e)}
                            error={errors.price}
                            touched={touched.price}
                        />

                        <button type="submit">
                            Add book
                        </button>

                        <br/>

                        {
                            this.state.success ? 
                            <div className="succes_entry">
                                <div> Successfully updated book</div>
                                <Link to={`/article/${this.props.books.updatedBook.doc._id}`}>
                                    To preview this book click here
                                </Link>
                                
                            </div>
                            :null
                        }


                    </form>
                )}        
                </Formik>

            </AdminLayout>
         )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddPosts);