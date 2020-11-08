import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import HomePage from './pages/Home'
import TestPage from './pages/test'
import NotFound from './pages/Notfound'



const routes = [
    { path: '/', component: HomePage },
    { path: '/test', component: TestPage },
    { path: '**', component: NotFound },
]




function Routers () {
    return (
        <Router>
            <Switch>
                { routes.map(rt => ( <Route key={rt.path} exact path={rt.path} component={rt.component} /> )) }
            </Switch>
        </Router>
    )
}

export default Routers