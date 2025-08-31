const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.SUPERTONE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'Server Error: API key not configured.' });
  }

  try {
    const apiResponse = await axios.get('https://api.supertone.io/v1/voices', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return res.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('Error in /api/voices:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Internal Server Error';
    return res.status(status).json({ message });
  }
};
