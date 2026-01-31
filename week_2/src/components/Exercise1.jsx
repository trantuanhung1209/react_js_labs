import React, { useState } from 'react'

function Exercise1() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const age = e.target[2].value;
        console.log(e);

        setFormData({
            name,
            email,
            age
        });
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Type your name...' 
            />
            <input type="email" placeholder='Type your email...' 
            />
            <input type="number" placeholder='Type your age...' 
            />
            <button type="submit">Submit</button>
        </form>

        <div className="">
            <h2>Your Information</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Age: {formData.age}</p>
        </div>
    </>
  )
}

export default Exercise1