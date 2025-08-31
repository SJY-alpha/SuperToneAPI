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
    
    // Supertone API가 오류 응답을 보냈는지 확인합니다.
    if (error.response) {
      // Supertone 서버가 보낸 상태 코드와 오류 메시지를 그대로 클라이언트에 전달합니다.
      return res.status(error.response.status).json({ 
        message: 'Supertone API Error', 
        detail: error.response.data 
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      return res.status(500).json({ message: 'Network Error', detail: 'No response received from Supertone API.' });
    } else {
      // 그 외의 서버 내부 오류
      return res.status(500).json({ message: 'Internal Server Error', detail: error.message });
    }
  }
};
