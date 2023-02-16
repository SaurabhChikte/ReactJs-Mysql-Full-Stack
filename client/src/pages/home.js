import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
// import { toast } from 'react-toastify'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (window.confirm("Are you sure that you wanted to delete contact")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className='container mt-5'>
            <Link to="/addContact">
                <button className='btn btn-primary my-2'>Add Contact</button>
            </Link>
            <table className='table table-bordered border-primary'>
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
                                <td className='text-center'>
                                    <Link to={`/update/${item.id}`}>
                                        <button type='button' className='btn btn-primary'>Edit</button>
                                    </Link>
                                    <button type="button" className='btn btn-danger mx-1' onClick={() => deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button type='button' className='btn btn-success'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Home
