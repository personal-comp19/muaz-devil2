import React, { useState, useEffect } from 'react';

function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carsList, setCarsList] = useState([
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Fiat' },
    { id: 4, name: 'Audi' },
    { id: 5, name: 'Toyota' },
  ]);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  const fetchServerData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/data');
      const result = await response.json();
      setData(result);
      if (result.length > 0) {
        setKeys(Object.keys(result[0]));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      id: data.length + 1, // Simple ID assignment, you might want to use a more robust solution
      first_name: name,
      last_name: 'Unknown', // Default value or add input fields for these
      email: email,
      gender: 'Unknown', // Default value or add input fields for these
      is_married: false // Default value or add input fields for these
    };

    const updatedData = [...data, newEntry];

    try {
      await fetch('http://127.0.0.1:4000/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      setData(updatedData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <div>My Form</div><br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          id='name'
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        /><br />
        <label htmlFor="email">Email: </label>
        <input
          id='email'
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        /><br />
        <label htmlFor="cars">Choose a car:</label>
        <select id="cars" name="cars">
          {carsList.map((car, index) => (
            <option key={index} value={car.name}>{car.name.toUpperCase()}</option>
          ))}
        </select><br />
        <textarea cols='20' rows='10'></textarea><br />
        <button type="submit">Submit</button>
      </form>

      <h2>Fetched Data</h2>
      <table>
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key, innerIndex) => (
                <td key={innerIndex}>
                  {typeof item[key] === 'boolean'
                    ? item[key]
                      ? 'Married'
                      : 'Single'
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyForm;
