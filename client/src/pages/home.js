import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { toast } from 'react-toastify'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='mt-36'>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='text-center'>No.</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>email</th>
                        <th className='text-center'>contact</th>
                        <th className='text-center'>action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button type='button' className='btn'></button>
                                    </Link>
                                    <button type="button" className='btn btn-danger'></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home
