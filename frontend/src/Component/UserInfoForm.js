import React, { useState } from 'react';
import './UserInfoForm.css'

const UserInfoForm = ({ handleFormSubmit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(email, name);
  };

  return (
    <div className='input-section'>
      <h2>Provide Your Information</h2>
      <form onSubmit={handleSubmit} className='form-center'>
        <div className='email'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='name'>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" class="button-29" role="button">Submit</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
