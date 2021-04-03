import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/* Redirects login page to homepage if user is currently logged in */
export const UnauthenticatedRoute = ({ component: C, appProps, ...rest }: any) => {
    return (
        <Route {...rest} render={props =>
            !appProps.isAuthenticated
                ? <C {...props} {...appProps} />
                : <Redirect to="/quote" />}
        />
    );
}

/* Redirects user TO login page from any other page if user is not currently logged in */
export const AuthenticatedRoute = ({ component: C, appProps, ...rest }: any) => {
    return (
        <Route {...rest} render={props =>
            appProps.isAuthenticated
                ? <C {...props} {...appProps} />
                : <Redirect to={`/`} />}
        />
    );
}