import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { Name: name, Age: age, Email: email, Address: address };

    try {
      const response = await fetch('http://localhost:5007/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Data submitted successfully!');
        setName('');
        setAge('');
        setEmail('');
        setAddress('');
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error');
    }
  };

  return (
    <div>
      <h1>Testing React Form with Google Sheets API</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Age</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
