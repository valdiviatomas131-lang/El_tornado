const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a POST route for OpenAI API requests
app.post('/api/openai', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Specify the model to use
      prompt: req.body.prompt,
      max_tokens: 100,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
