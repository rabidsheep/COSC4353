import React, { useEffect } from 'react';
import { useHistory } from "react-router";

export function Logout() {
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        console.log("storage cleared");

        //window.location.href = '/login';
        history.push('/login');
    }, []);

    return <p>Logging out</p>;
}