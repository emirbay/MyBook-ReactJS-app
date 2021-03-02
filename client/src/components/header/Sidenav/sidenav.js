import React from 'react';
import SideNav from 'react-simple-sidenav';
import Items from './items';

const MainNav = (props) => {
    return (
      <SideNav
        showNav = {props.showNav}
        onHideNav = {props.onHideNav}
        navStyle={
            {
                background: '#242424',
                maxWidth: '15em'
            }
        }
      >
        <Items onHideNav={props.onHideNav}/>
      </SideNav>
    )

}


export default MainNav;