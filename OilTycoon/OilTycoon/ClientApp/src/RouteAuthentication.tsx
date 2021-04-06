import React from 'react';
import { Redirect, Route } from 'react-router-dom'

/* Redirects login page to homepage if user is currently logged in */
export const UnauthenticatedRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('jwt') === null
            ? <Component {...props} />
            : <Redirect to='/quote' />
    )} />
)

/* Redirects user TO login page from any other page if user is not currently logged in */
export const AuthenticatedRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('jwt') !== null
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)
