import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const apiKey = "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"
const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

app.use(bodyParser.json());
app.use(cors());

app.post('/suggestions', async (req, res) => {
  try {
    const code = req.body.code;
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        'prompt': `Please improve the following code:\n\n${code}`,
        'max_tokens': 2048,
        'temperature': 0.7,
        'stop': '\n'
      })
    });
    const data = await response.json();
    console.log(data)
    const suggestion = data && data.choices && data.choices[0] && data.choices[0].text ? data.choices[0].text.trim() : '';
    console.log(suggestion)
    res.json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});