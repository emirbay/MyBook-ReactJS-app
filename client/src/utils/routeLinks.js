export const RouteLinks = {
    common: [
    {
        icon: 'home',
        text: 'Home',
        link: '/'
    },
    {
        icon: 'sing-in',
        text: 'Log-in',
        link: '/login',
        restricted: true
    }
    ],
    admin: [
        {
            icon: 'sign-out',
            text: 'Log-out',
            link:'/logout'
        },
        {
            icon: 'home',
            text: 'Admin',
            link:'/admin'
        },
        {
            icon: 'clipboard',
            text: 'My posts',
            link:'/admin/posts'
        },
        {
            icon: 'plus',
            text: 'Add posts',
            link:'/admin/posts/create'
        }
    ]
}