import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/user_actions'
const Logout =(props)=> {
    // useState from redux
    const logout = useSelector(state => state.user);
    // dispatch so we can update everything
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(logoutUser());
    },[dispatch])    // run one time


    useEffect(()=> {
        if(logout.auth===null) {
          setTimeout(()=> {
            props.history.push('/')
          },2000)  
        }
    },[logout,props])

    return (
        <div className="logout_container">
            <h1>
                Bye byee!
            </h1>
        </div>
    )
}

export default Logout;
