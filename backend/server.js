const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const credentials = require('./api.json');

const app = express();
const PORT = 5007;

// Use CORS middleware to allow requests from your frontend
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust the origin if needed
app.use(bodyParser.json());

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1d8dqCY1xe1S-sEEddEHR3_uKZdtsTBcfZYXFSaZ15wA';

app.post('/submit', async (req, res) => {
  const { Name, Age, Email, Address } = req.body;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [[Name, Age, Email, Address]] },
    });
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send('Error adding data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
