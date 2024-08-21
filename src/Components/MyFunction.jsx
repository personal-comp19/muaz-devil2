import React, { useState, useEffect } from 'react';

export default function MyFunction() {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  const updateCounter = () => {
    setCount(count + 1);
  };

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

  const handleEdit = (item) => {
    setEditing(item.id);
    setEditData(item);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const updatedData = data.map(item =>
      item.id === editData.id ? editData : item
    );
    try {
      await fetch('http://127.0.0.1:4000/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      setData(updatedData);
      setEditing(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <div>My Function</div><br/>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div>{count}</div>
      <button onClick={updateCounter}>Count</button>
      <table>
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {keys.map((key, index) => (
                <td key={index}>
                  {editing === item.id ? (
                    <input
                      type="text"
                      name={key}
                      value={editData[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    typeof item[key] === 'boolean'
                      ? item[key]
                        ? 'Married'
                        : 'Single'
                      : item[key]
                  )}
                </td>
              ))}
              <td>
                {editing === item.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(item)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
