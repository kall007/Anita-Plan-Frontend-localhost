import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>404 Error</h1>
            <p>Oops! Something went wrong.</p>
            <p><Link to="/">Go back to homepage</Link></p>
        </div>
    );
}

export default ErrorPage;