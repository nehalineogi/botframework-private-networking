import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/build')));

// POST route to generate Direct Line token
app.post('/getDirectLineToken', async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DIRECTLINE_URL}/.bot/v3/directline/tokens/generate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.DIRECTLINE_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: req.body.user,
        }),
      }
    );

    const responseBody = await response.text();
    console.log('Response from Direct Line API:', responseBody);

    if (!response.ok) {
      console.error('Failed to generate token:', responseBody);
      return res.status(500).json({ error: 'Error generating token' });
    }

    const { token } = JSON.parse(responseBody);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});