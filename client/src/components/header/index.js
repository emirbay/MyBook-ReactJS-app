import React,{ useState, useContext }  from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import MainNav from './Sidenav/sidenav';
 
 
// default export here
const Header = (props) => {

  let [mainNav, setMainNav] = useState(false);

  const onShowNav = () => {
    setMainNav (true);
  }

  const onHideNav = () => {
    setMainNav (false);
  }

  return (
    <header>
      <div className="open_nav">
      <FontAwesome
        name = "bars"
        onClick = {()=>onShowNav(true)}
        style = {{
          color: '#FFFF',
          padding: '1px',
          cursor: 'pointer',
          fontSize:'25px'
        }}
      />
      </div>
        <MainNav 
        showNav = {mainNav}
        onHideNav = {()=>onHideNav(false)}
        ></MainNav>
           <Link to="/" className = "logo"> My book collection </Link>
    </header>
  )
}

 

export default Header;