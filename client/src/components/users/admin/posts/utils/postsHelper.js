import React from 'react';
import * as Yup from 'yup';

export const BookSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    author: Yup.string().required('Author is required'),
    pages: Yup.number().required('Pages is required'),
    rating: Yup.number().required('Rating is required'),
    price: Yup.number().required('Price is required'),
})

export const FormElement = (props) => {
    let template = null;

    switch(props.elData.element) {
        case 'input':
            template = 
            <div className="row">
               <div className="twelve columns">
                   <input
                        type={props.elData.type}
                        name={props.name}
                        onChange={(e)=>props.onHandleChange(e)}
                        onBlur={(e)=>props.onHandleBlur(e)}
                        value={props.elData.value}
                        placeholder={props.placeholder}
                        className="u-full-width"
                    />
                    { props.error && props.touched ?
                    <div className="error_label">{props.error}</div>
                    : null}
                </div>     
            </div>
         break;
        case 'select':
            template = 
            <div className="row">
               <div className="twelve columns"> 
                 <select 
                   name={props.name}
                   onChange={(e)=>props.onHandleChange(e)}
                   onBlur={(e)=>props.onHandleBlur(e)}
                   value={props.elData.value}
                   className="u-full-width">
                       {props.children}
                 </select>
                 { props.error && props.touched ?
                    <div className="error_label">{props.error}</div>
                    : null}
               </div>     
            </div>        
        break;
        default:
           template= null;

    }

    return template;
}