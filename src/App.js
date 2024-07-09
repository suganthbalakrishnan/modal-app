import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      const openButton = document.getElementById('open-button');
      if (showModal && event.target.closest('.modal') === null && event.target !== openButton) {
        setShowModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);

    if (dobDate >= today) {
      alert('Invalid date of birth. Date must be in the past.');
      return;
    }

    // On successful submission, reset form data and close modal
    
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
    setShowModal(false);
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button id='open-button' className='submit-button' onClick={() => setShowModal(true)}>Open Form</button>
      <button className="test"></button>
      {showModal &&
        <dialog open={showModal} >
          <div className="modal" >
            <div className="modal-content" >
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  pattern=".+@.+"
                  title={`Please include an '@' in the email address. '${formData.email} is missing an '@'`}
                  required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />

                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  required
                />
                <button type='submit' className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      }
    </div>
  );
}

export default App;