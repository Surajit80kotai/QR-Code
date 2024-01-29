import React, { useEffect } from 'react';

const Index = () => {
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

    useEffect(() => {
        window.location.href = redirectUrl;
    }, [redirectUrl]);

    return (
        <></>
    );
};

export default Index;
