import React, { Component } from 'react'
import {Formik} from 'formik';
import {Link} from 'react-router-dom';
import AdminLayout from '../../../../hoc/adminLayout'
 
import {
    BookSchema,
    FormElement
} from './utils/postsHelper'

//WYSWYG
import {EditorState} from 'draft-js'; //handle state
import {stateToHTML} from 'draft-js-export-html'; // convert object
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {connect} from 'react-redux';
import {addBook, clearBook}  from '../../../../store/actions/book_actions'


  class AddPosts extends Component {
    state= {
        editorState: EditorState.createEmpty(),
        editorContentHTML:'',
        success:false
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState,
            editorContentHTML: stateToHTML(editorState.getCurrentContent())
        })
    }
    // post book
    onPostBook = (values) => {
        this.props.dispatch(addBook(values))
    }

    componentDidUpdate(prevProps) {
        console.log(this.props)
        const hasChanged = this.props.books !== prevProps.books
        if (hasChanged) {
            this.setState({success: true})
        }
    }
    // clear state on unmount
    componentWillUnmount() {
        this.props.dispatch(clearBook());
    }
    

    render() {
        return (
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    initialValues={{
                        name:'',
                        author:'',
                       // content:"Content", handled by other component
                        pages:'',
                        rating:'',
                        price:''
                    }}
                    validationSchema={ BookSchema }
                    onSubmit={(values, {resetForm})=>{
                        // console.log(values);
                        //console.log(this.state.editorState); // complex object
                        //console.log(this.state.editorContentHTML);  // html text
                        this.onPostBook({
                            ...values,
                            content: this.state.editorContentHTML
                        })
                        //reset form
                        resetForm({});
                        this.setState({
                            editorState: EditorState.createEmpty(),
                            editorContentHTML:'',
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
                            <div className="success_entry">
                                <div> Successfully added book</div>
                                <Link to={`/article/${this.props.books.add.bookId}`}>
                                    Check book details
                                </Link>
                            <br/>
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