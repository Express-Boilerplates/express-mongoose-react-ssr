import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'

const About = () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}
const NotFound = () => {
    return (
        <div>
            <h1>not found</h1>
        </div>
    )
}

const Article = () => {
    return (
        <div>
            <h1>Article</h1>
        </div>
    )
}

const routes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/articles',
        component: Article,
        exact: true,
    },
]

export const ClientRoutes = () => {
    return (
        <Switch>
            {routes.map((route, i) => (
                <Route key={i} {...route} />
            ))}
        </Switch>
    )
}

export default routes
