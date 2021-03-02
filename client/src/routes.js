import React from 'react';
import { Switch , Route, BrowserRouter} from 'react-router-dom';

// routes
import Home from './components/home'
import Login from './components/users/login'
import Logout from './components/users/logout'
import Article from './components/article';
// admin
import Admin from './components/users/admin';
import AddPosts from './components/users/admin/posts/add';
import EditPost from './components/users/admin/posts/edit';
import AdminPosts from './components/users/admin/posts/posts';
//HOC
import MainLayout from './hoc/mainLayout'
import Auth from './hoc/auth'
 
const Routes = () => {
    return (
        <BrowserRouter>
           <MainLayout>
                <Switch>
                    <Route path="/admin/posts/edit/:id" component={Auth(EditPost,true)}/>
                    <Route path="/admin/posts/create" component={Auth(AddPosts,true)}/>
                    <Route path="/admin/posts" component={Auth(AdminPosts,true)}/>
                    <Route path="/article/:id" component={Auth(Article)}/>
                    <Route path="/admin" component={Auth(Admin,true)}/>
                    <Route path="/logout" component={Auth(Logout, true)}/>
                    <Route path="/login" component={Auth(Login,false)}/>
                    <Route path="/" component={Auth(Home)}/>
                </Switch>
                </MainLayout>
          </BrowserRouter>
        )
}

export default Routes;