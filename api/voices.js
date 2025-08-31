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
    const apiResponse = await axios.get('https://supertoneapi.com/v1/voices/search', {
      headers: {
        'x-sup-api-key': apiKey
      },
      params: req.query
    });
    
    // --- 최종 수정 ---
    // Supertone API의 'items' 배열을 프론트엔드가 기대하는 'voices' 배열로 변경해줍니다.
    const responseForClient = {
      voices: apiResponse.data.items || [] 
    };
    
    return res.status(200).json(responseForClient);

  } catch (error) {
    console.error('Error in /api/voices/search:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Internal Server Error';
    return res.status(status).json({ message });
  }
};

