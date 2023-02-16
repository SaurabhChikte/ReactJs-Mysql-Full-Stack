import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {

    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }))
    }, [id])

    return (
        <div className='container justify-content-center mt-5'>
            <div className='card'>
                <div className='card-header text-center'>
                    <p>User Contact Detail</p>
                </div>
                <div className='card-body text-center'>
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <strong>Contact:</strong>
                    <span>{user.contact}</span>
                    <br />
                    <Link to="/">
                        <div className='btn btn-darks'></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View
