import  React  from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {RouteLinks} from '../../../utils/routeLinks';
import {connect} from 'react-redux';

const Items = (props) => {


    const element = (item, i ) => (
        <div key={i} className="navItem">
            <Link to={item.link}
                onClick={props.onHideNav}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showLinks = () => (
        RouteLinks.common.map((item, i) => {
            // dont show Login if user is logged in
                if(props.user.auth && item.restricted) {
                     return null;
                }
                else {
                    return element(item,i);    
                }

            
        })
    )

    const showAdminLinks = () => (
        RouteLinks.admin.map((item, i) => {
            return element(item,i);
        })
    )

    return (
        <div>
                {showLinks()}
                {props.user.auth ?  // if authenticated show admin options
                    <div>
                        <div className = "nav_split">
                            Admin options
                        </div>
                        {showAdminLinks()}
                    </div>
                : null }
  
        </div>
    )
}

function mapStateToProps(state) {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps) (Items);