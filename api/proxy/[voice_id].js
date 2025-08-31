const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { voice_id } = req.query;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required.' });
  }

  const apiKey = process.env.SUPERTONE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'Server Error: API key not configured.' });
  }

  try {
    const apiResponse = await axios.post(
      `https://api.supertone.io/v1/text-to-speech/${voice_id}`,
      { text },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer'
      }
    );

    res.setHeader('Content-Type', 'audio/wav');
    return res.status(200).send(apiResponse.data);

  } catch (error) {
    console.error(`Error in /api/proxy/${voice_id}:`, error);
    const status = error.response ? error.response.status : 500;
    const data = error.response ? Buffer.from(error.response.data).toString('utf-8') : 'Internal Server Error';
    return res.status(status).json({ message: data });
  }
};

