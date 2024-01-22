import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();
    console.log({ token });

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            navigate('/create');
        }
    }, [token, navigate]);

    return (
        <div>Index</div>
    )
}

export default Index