import { google } from 'googleapis';
import credentials from '../api.json'; // Adjust the path if needed

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1d8dqCY1xe1S-sEEddEHR3_uKZdtsTBcfZYXFSaZ15wA';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { Name, Age, Email, Address } = req.body;

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[Name, Age, Email, Address]] },
      });

      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ message: 'Error adding data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
