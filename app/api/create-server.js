import { createVultrServer } from '../../lib/vultr'; // Vultr API 호출 함수 임포트

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { region, plan, os, label } = req.body;

      // Vultr API로 서버 생성 요청
      const result = await createVultrServer(region, plan, os, label);

      if (result.success) {
        return res.status(200).json({ success: true, server: result.server });
      } else {
        return res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}