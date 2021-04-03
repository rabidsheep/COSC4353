﻿import React from 'react';
import { Redirect } from 'react-router-dom'

export function Logout() {
    localStorage.clear();

    return (<Redirect to={`/`} />);
}