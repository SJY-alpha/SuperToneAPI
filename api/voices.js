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
    // 공식 문서의 'GET /v1/voices' 엔드포인트를 사용하여 전체 목록을 가져옵니다.
    const apiResponse = await axios.get('https://supertoneapi.com/v1/voices', {
      headers: { 
        'x-sup-api-key': apiKey 
      }
    });
    
    // Supertone API 응답을 그대로 클라이언트에 반환합니다.
    // 이 응답은 {"voices": [...]} 형식으로 예상됩니다.
    return res.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('Error in /api/voices:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Internal Server Error';
    return res.status(status).json({ message });
  }
};

