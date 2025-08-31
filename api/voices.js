const axios = require('axios');

module.exports = async (req, res) => {
  // GET 요청이 아니면 거부합니다.
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.SUPERTONE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'Server Error: API key not configured.' });
  }

  try {
    // 클라이언트에서 보낸 쿼리(?gender=male 등)를 그대로 Supertone 검색 API로 전달합니다.
    const apiResponse = await axios.get('https://supertoneapi.com/v1/voices/search', {
      headers: { 
        'x-sup-api-key': apiKey 
      },
      params: req.query 
    });
    
    // Supertone API가 보낸 응답을 수정 없이 그대로 클라이언트에 반환합니다.
    // (e.g., {"items": [...], "total": 100})
    return res.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('Error in /api/voices/search:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Internal Server Error';
    return res.status(status).json({ message });
  }
};

