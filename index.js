const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  console.log('File path:', filePath);  

  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Server error');
    }

    console.log('Data read from file:', data);  
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Error parsing JSON');
    }
  });
});

app.put('/data', (req, res) => {
  const newData = req.body;
  console.log('Received data for update:', newData);

  if (!newData) {
    return res.status(400).send('No data provided');
  }

  const filePath = path.join(__dirname, 'data.json');
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error('Error writing data file:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Data updated successfully');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(4000, () => {
  console.log("Server started on port 4000!");
});
