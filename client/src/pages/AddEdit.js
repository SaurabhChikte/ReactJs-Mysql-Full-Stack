import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    contact: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { name, email, contact } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({ ...resp.data[0] }))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Please provide value in all fields");
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact,
                }).then(() => {
                    setState({ name: "", email: "", contact: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact added successfully..!");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    name,
                    email,
                    contact,
                }).then(() => {
                    setState({ name: "", email: "", contact: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact updated successfully..!")
            }
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div className='mt-5 w-25 m-auto'>
            <form className='p-3 border' onClick={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input className='form-control' type="text" name="name" id="name" placeholder="Your Name" value={name || ""} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input className='form-control' type="text" name="email" id="email" placeholder="Your email" value={email || ""} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="contact">Contact</label>
                    <input className='form-control' type="number" name="contact" id="contact" placeholder="Your contact" value={contact || ""} onChange={handleInputChange} />
                </div>
                <div className='my-3'>
                    <input type="submit" className='btn btn-primary m-1' value={id ? "Update" : "Save"} />
                    <Link to="/">
                        <input type="button" className='btn btn-secondary' value="Go back" />
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddEdit
