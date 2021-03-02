import React from 'react';
import Header from '../components/header/index'

const MainLayout = (props) => {
    return(
    <>
        <Header/>
        <>
            {props.children}
        </>
    </>
)}

export default MainLayout;